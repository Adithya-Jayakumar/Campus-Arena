import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

/**
 */
@ObjectType('Arena')
export class ArenaModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  category: string; // SPORTS | AUDITORIUM | OPEN_GROUND | LAB

  @Field()
  description: string;

  @Field()
  location: string;

  @Field(() => Int)
  capacity: number;

  @Field()
  imageUrl: string;

  @Field()
  isIndoor: boolean;

  @Field()
  openingTime: string;

  @Field()
  closingTime: string;

  @Field()
  createdAt: Date;
}
