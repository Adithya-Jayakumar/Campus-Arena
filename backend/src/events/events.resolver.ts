import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CampusEventModel, EventRegistrationModel } from './models/event.model';
import { CreateEventDto, RegisterEventDto } from './dto/event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

/**
 */
@Resolver(() => CampusEventModel)
export class EventsResolver {
  constructor(private eventsService: EventsService) {}

  @Query(() => [CampusEventModel], { name: 'campusEvents', description: 'List upcoming tournaments and fests' })
  async getEvents(
    @Args('category', { type: () => String, nullable: true }) category?: string,
  ): Promise<CampusEventModel[]> {
    const events = await this.eventsService.findAll(category);
    return events as unknown as CampusEventModel[];
  }

  @Query(() => CampusEventModel, { name: 'campusEvent', description: 'Get event by ID with registrations' })
  async getEvent(@Args('id', { type: () => ID }) id: string): Promise<CampusEventModel> {
    const event = await this.eventsService.findById(id);
    return event as unknown as CampusEventModel;
  }

  @Mutation(() => CampusEventModel, { description: 'Coordinator/Admin: Create a campus tournament or fest' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'FACULTY')
  async createEvent(
    @Args('input', { type: () => CreateEventDto }) input: CreateEventDto,
  ): Promise<CampusEventModel> {
    const event = await this.eventsService.create(input);
    return event as unknown as CampusEventModel;
  }

  @Mutation(() => EventRegistrationModel, { description: 'Student: Register team for a tournament' })
  @UseGuards(JwtAuthGuard)
  async registerEventTeam(
    @CurrentUser() user: any,
    @Args('input', { type: () => RegisterEventDto }) input: RegisterEventDto,
  ): Promise<EventRegistrationModel> {
    const reg = await this.eventsService.registerTeam(user.id, input);
    return reg as unknown as EventRegistrationModel;
  }
}
