import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsInt, IsUrl, IsDateString, IsOptional, Min } from 'class-validator';

@InputType('CreateEventInput')
export class CreateEventDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  category: string;

  @Field()
  @IsUrl()
  bannerUrl: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  venue: string;

  @Field()
  @IsDateString()
  startDate: string;

  @Field()
  @IsDateString()
  endDate: string;

  @Field(() => Int, { defaultValue: 16 })
  @IsInt()
  @Min(2)
  maxTeams: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  rules?: string;
}

@InputType('RegisterEventInput')
export class RegisterEventDto {
  @Field(() => ID)
  @IsNotEmpty()
  eventId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  teamName: string;

  @Field(() => Int, { defaultValue: 1 })
  @IsInt()
  @Min(1)
  membersCount: number;
}
