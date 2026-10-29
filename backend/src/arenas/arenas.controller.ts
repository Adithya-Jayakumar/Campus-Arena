import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ArenasService } from './arenas.service';
import { CreateArenaDto } from './dto/arena.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

/**
 */
@Controller('arenas')
export class ArenasController {
  constructor(private arenasService: ArenasService) {}

  @Get()
  async getAllArenas(@Query('category') category?: string) {
    return this.arenasService.findAll(category);
  }

  @Get(':id')
  async getArenaById(@Param('id') id: string) {
    return this.arenasService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async createArena(@Body(new ValidationPipe({ whitelist: true })) dto: CreateArenaDto) {
    return this.arenasService.create(dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async deleteArena(@Param('id') id: string) {
    return this.arenasService.delete(id);
  }
}
