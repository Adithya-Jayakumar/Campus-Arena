import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards, UsePipes } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingModel } from './models/booking.model';
import { CreateBookingDto } from './dto/booking.dto';
import { BookingValidationPipe } from './pipes/booking-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

/**
 */
@Resolver(() => BookingModel)
@UseGuards(JwtAuthGuard)
export class BookingsResolver {
  constructor(private bookingsService: BookingsService) {}

  @Query(() => [BookingModel], { name: 'myBookings', description: 'Retrieve the logged in user bookings' })
  async getMyBookings(@CurrentUser() user: any): Promise<BookingModel[]> {
    const list = await this.bookingsService.findMyBookings(user.id);
    return list as unknown as BookingModel[];
  }

  @Query(() => [BookingModel], { name: 'allBookings', description: 'Admin/Faculty: View all reservations' })
  async getAllBookings(
    @Args('status', { type: () => String, nullable: true }) status?: string,
  ): Promise<BookingModel[]> {
    const list = await this.bookingsService.findAll(status);
    return list as unknown as BookingModel[];
  }

  @Mutation(() => BookingModel, { description: 'Reserve a campus facility or sports court' })
  @UsePipes(new BookingValidationPipe())
  async createBooking(
    @CurrentUser() user: any,
    @Args('input', { type: () => CreateBookingDto }) input: CreateBookingDto,
  ): Promise<BookingModel> {
    const booking = await this.bookingsService.createBooking(user.id, input);
    return booking as unknown as BookingModel;
  }

  @Mutation(() => BookingModel, { description: 'Cancel an existing reservation' })
  async cancelBooking(
    @CurrentUser() user: any,
    @Args('id', { type: () => ID }) id: string,
  ): Promise<BookingModel> {
    const cancelled = await this.bookingsService.cancelBooking(id, user.id, user.role);
    return cancelled as unknown as BookingModel;
  }
}
