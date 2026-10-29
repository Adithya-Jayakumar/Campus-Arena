import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/booking.dto';
import { BookingValidationPipe } from './pipes/booking-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

/**
 * Module II.4: Built-in vs Custom Pipes demonstration in REST Controllers
 */
@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @Post()
  @UsePipes(new BookingValidationPipe()) // Custom Pipe applied
  async createBooking(
    @CurrentUser() user: any,
    @Body() dto: CreateBookingDto,
  ) {
    return this.bookingsService.createBooking(user.id, dto);
  }

  @Get('my')
  async getMyBookings(@CurrentUser() user: any) {
    return this.bookingsService.findMyBookings(user.id);
  }

  @Get()
  async getAllBookings(@Query('status') status?: string) {
    return this.bookingsService.findAll(status);
  }

  @Patch(':id/cancel')
  async cancelBooking(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ) {
    return this.bookingsService.cancelBooking(id, user.id, user.role);
  }
}
