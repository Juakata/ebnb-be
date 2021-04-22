import { Field, ID, InputType } from '@nestjs/graphql';
import { MinLength, MaxLength, IsUUID, IsNumber, IsUrl } from 'class-validator';
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

  @IsUrl()
  @Field()
  image: string;

  @IsNumber()
  @Field()
  capacity: number;

  @IsUUID('4', { each: true })
  @Field((type) => [ID], { defaultValue: [] })
  features: string[];
}

@InputType()
export class AssignFeaturesToSpace {
  @IsUUID('4', { each: true })
  @Field((type) => [ID])
  features: string[];

  @IsUUID()
  @Field((type) => ID)
  space_id: string;
}
