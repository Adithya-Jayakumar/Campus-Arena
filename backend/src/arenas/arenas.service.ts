import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArenaDto } from './dto/arena.dto';

/**
 */
@Injectable()
export class ArenasService {
  constructor(private prisma: PrismaService) {}

  async findAll(category?: string) {
    return this.prisma.arena.findMany({
      where: category ? { category } : undefined,
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: string) {
    const arena = await this.prisma.arena.findUnique({
      where: { id },
      include: {
        bookings: {
          where: {
            endTime: { gte: new Date() },
            status: { in: ['CONFIRMED', 'PENDING'] },
          },
          orderBy: { startTime: 'asc' },
        },
      },
    });

    if (!arena) {
      throw new NotFoundException(`Arena facility with ID ${id} not found`);
    }

    return arena;
  }

  async create(dto: CreateArenaDto) {
    return this.prisma.arena.create({
      data: dto,
    });
  }

  async delete(id: string) {
    return this.prisma.arena.delete({
      where: { id },
    });
  }
}
