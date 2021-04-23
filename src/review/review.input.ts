import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNumber, IsUUID, Max, Min } from 'class-validator';

@InputType()
export class CreateReviewInput {
  @Field()
  comment: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  @Field()
  rate: number;

  @IsUUID('4', { each: true })
  @Field((type) => ID)
  user_id: string;

  @IsUUID('4', { each: true })
  @Field((type) => ID)
  space: string;
}
