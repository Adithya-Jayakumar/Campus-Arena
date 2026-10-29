import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto, RegisterEventDto } from './dto/event.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async findAll(category?: string) {
    return this.prisma.event.findMany({
      where: category ? { category } : undefined,
      include: {
        registrations: true,
      },
      orderBy: { startDate: 'asc' },
    });
  }

  async findById(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        registrations: {
          include: {
            user: { select: { id: true, name: true, department: true } },
          },
        },
      },
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return event;
  }

  async create(dto: CreateEventDto) {
    return this.prisma.event.create({
      data: {
        title: dto.title,
        description: dto.description,
        category: dto.category,
        bannerUrl: dto.bannerUrl,
        venue: dto.venue,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        maxTeams: dto.maxTeams,
        rules: dto.rules,
      },
    });
  }

  async registerTeam(userId: string, dto: RegisterEventDto) {
    const event = await this.prisma.event.findUnique({
      where: { id: dto.eventId },
      include: { registrations: true },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    if (event.registrations.length >= event.maxTeams) {
      throw new BadRequestException('Event registrations are fully booked');
    }

    const alreadyRegistered = event.registrations.some((r) => r.userId === userId);
    if (alreadyRegistered) {
      throw new BadRequestException('You or your team are already registered for this event');
    }

    return this.prisma.eventRegistration.create({
      data: {
        eventId: dto.eventId,
        userId,
        teamName: dto.teamName,
        membersCount: dto.membersCount,
      },
    });
  }
}
