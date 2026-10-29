import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/booking.dto';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async createBooking(userId: string, dto: CreateBookingDto) {
    const arena = await this.prisma.arena.findUnique({
      where: { id: dto.arenaId },
    });

    if (!arena) {
      throw new NotFoundException(`Arena with ID ${dto.arenaId} does not exist`);
    }

    const start = new Date(dto.startTime);
    const end = new Date(dto.endTime);

    // Conflict detection: Check for existing active bookings in the same arena during that window
    const overlapping = await this.prisma.booking.findFirst({
      where: {
        arenaId: dto.arenaId,
        status: { in: ['CONFIRMED', 'PENDING'] },
        AND: [
          { startTime: { lt: end } },
          { endTime: { gt: start } },
        ],
      },
    });

    if (overlapping) {
      throw new ConflictException(
        `Slot collision: Arena "${arena.name}" is already reserved between ${overlapping.startTime.toLocaleTimeString()} and ${overlapping.endTime.toLocaleTimeString()}. Please choose an open slot.`,
      );
    }

    return this.prisma.booking.create({
      data: {
        userId,
        arenaId: dto.arenaId,
        title: dto.title,
        purpose: dto.purpose,
        startTime: start,
        endTime: end,
        status: 'CONFIRMED',
      },
      include: {
        arena: true,
        user: {
          select: { id: true, name: true, email: true, department: true },
        },
      },
    });
  }

  async findMyBookings(userId: string) {
    return this.prisma.booking.findMany({
      where: { userId },
      include: {
        arena: true,
      },
      orderBy: { startTime: 'desc' },
    });
  }

  async findAll(status?: string) {
    return this.prisma.booking.findMany({
      where: status ? { status } : undefined,
      include: {
        arena: true,
        user: {
          select: { id: true, name: true, email: true, department: true },
        },
      },
      orderBy: { startTime: 'desc' },
    });
  }

  async cancelBooking(bookingId: string, userId: string, role: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Only owner or Admin/Faculty can cancel
    if (booking.userId !== userId && role !== 'ADMIN' && role !== 'FACULTY') {
      throw new ForbiddenException('You do not have permission to cancel this booking');
    }

    return this.prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'CANCELLED' },
      include: { arena: true },
    });
  }
}
