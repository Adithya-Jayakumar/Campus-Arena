import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType('EventRegistration')
export class EventRegistrationModel {
  @Field(() => ID)
  id: string;

  @Field()
  teamName: string;

  @Field(() => Int)
  membersCount: number;

  @Field()
  status: string;

  @Field()
  registeredAt: Date;
}

@ObjectType('CampusEvent')
export class CampusEventModel {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  category: string; // SPORTS | CULTURAL | TECHNICAL

  @Field()
  bannerUrl: string;

  @Field()
  venue: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;

  @Field(() => Int)
  maxTeams: number;

  @Field({ nullable: true })
  rules?: string;

  @Field(() => [EventRegistrationModel], { nullable: true })
  registrations?: EventRegistrationModel[];
}
