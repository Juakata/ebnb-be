import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateFeatureInput {
  @MinLength(3)
  @MaxLength(50)
  @Field()
  name: string;
}
