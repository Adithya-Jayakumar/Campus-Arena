import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsDateString, IsUUID } from 'class-validator';

@InputType('CreateBookingInput')
export class CreateBookingDto {
  @Field(() => ID)
  @IsNotEmpty()
  arenaId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  purpose: string;

  @Field()
  @IsDateString()
  @IsNotEmpty()
  startTime: string;

  @Field()
  @IsDateString()
  @IsNotEmpty()
  endTime: string;
}
