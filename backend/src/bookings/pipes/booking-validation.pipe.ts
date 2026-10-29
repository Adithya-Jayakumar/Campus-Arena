import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { CreateBookingDto } from '../dto/booking.dto';

/**
 * Intercepts incoming parameters/body before reaching Controller or Resolver,
 * validates chronological consistency, minimum/maximum duration, and sanitizes input.
 */
@Injectable()
export class BookingValidationPipe implements PipeTransform<CreateBookingDto, CreateBookingDto> {
  transform(value: CreateBookingDto, metadata: ArgumentMetadata): CreateBookingDto {
    if (!value) {
      throw new BadRequestException('Booking payload is missing');
    }

    const { startTime, endTime } = value;

    if (!startTime || !endTime) {
      throw new BadRequestException('Both startTime and endTime are required');
    }

    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();

    if (isNaN(start) || isNaN(end)) {
      throw new BadRequestException('Invalid ISO-8601 date-time format for slot times');
    }

    if (start >= end) {
      throw new BadRequestException('Booking slot startTime must be before endTime');
    }

    const durationMinutes = (end - start) / (1000 * 60);

    if (durationMinutes < 30) {
      throw new BadRequestException('Minimum arena booking duration is 30 minutes');
    }

    if (durationMinutes > 240) {
      throw new BadRequestException('Maximum single arena reservation duration is 4 hours (240 mins)');
    }

    return value;
  }
}
