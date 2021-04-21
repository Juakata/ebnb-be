import { Field, InputType } from '@nestjs/graphql';
import { MinLength, MaxLength } from 'class-validator';
import { AllowedType } from './space.type';

@InputType()
export class CreateSpaceInput {
  @MinLength(3)
  @MaxLength(50)
  @Field()
  name: string;

  @Field((type) => AllowedType)
  type: AllowedType;

  @MinLength(3)
  @MaxLength(50)
  @Field()
  place: string;

  @Field()
  image: string;

  @Field()
  capacity: number;
}
