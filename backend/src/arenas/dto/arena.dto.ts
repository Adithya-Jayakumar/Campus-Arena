import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsInt, IsBoolean, IsUrl, IsOptional } from 'class-validator';

/**
 * Module III.4: Defining GraphQL Input Types & DTO Validation
 */
@InputType('CreateArenaInput')
export class CreateArenaDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  category: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  location: string;

  @Field(() => Int)
  @IsInt()
  capacity: number;

  @Field()
  @IsUrl()
  imageUrl: string;

  @Field({ defaultValue: false })
  @IsBoolean()
  @IsOptional()
  isIndoor?: boolean;

  @Field({ defaultValue: '06:00' })
  @IsString()
  @IsOptional()
  openingTime?: string;

  @Field({ defaultValue: '21:00' })
  @IsString()
  @IsOptional()
  closingTime?: string;
}
