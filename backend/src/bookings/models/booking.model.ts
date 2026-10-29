import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ArenaModel } from '../../arenas/models/arena.model';

@ObjectType('BookingUser')
export class BookingUser {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  department: string;
}

@ObjectType('Booking')
export class BookingModel {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  purpose: string;

  @Field()
  startTime: Date;

  @Field()
  endTime: Date;

  @Field()
  status: string; // PENDING | CONFIRMED | REJECTED | CANCELLED

  @Field(() => ArenaModel, { nullable: true })
  arena?: ArenaModel;

  @Field(() => BookingUser, { nullable: true })
  user?: BookingUser;

  @Field()
  createdAt: Date;
}
