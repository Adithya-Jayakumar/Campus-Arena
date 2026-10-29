import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto, RegisterEventDto } from './dto/event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  async getAllEvents(@Query('category') category?: string) {
    return this.eventsService.findAll(category);
  }

  @Get(':id')
  async getEventById(@Param('id') id: string) {
    return this.eventsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'FACULTY')
  async createEvent(@Body() dto: CreateEventDto) {
    return this.eventsService.create(dto);
  }

  @Post('register')
  @UseGuards(JwtAuthGuard)
  async registerTeam(
    @CurrentUser() user: any,
    @Body() dto: RegisterEventDto,
  ) {
    return this.eventsService.registerTeam(user.id, dto);
  }
}
