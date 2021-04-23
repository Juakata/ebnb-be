import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDateString, IsUUID } from 'class-validator';

@InputType()
export class CreateBookingInput {
  @IsDateString()
  @Field()
  initial_time: string;

  @IsDateString()
  @Field()
  end_time: string;

  @IsDateString()
  @Field()
  initial_date: string;

  @IsDateString()
  @Field()
  end_date: string;

  @IsUUID()
  @Field((type) => ID)
  space: string;

  @IsUUID('4', { each: true })
  @Field((type) => ID)
  user_id: string;
}
