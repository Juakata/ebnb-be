import { Field, InputType, ID } from '@nestjs/graphql';
import {
  IsEmail,
  IsUUID,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AllowedUserKey } from './user.type';
import { AssignFeaturesToSpace } from '../space/space.input';

@InputType()
export class CreateUserInput {
  @MinLength(3)
  @MaxLength(50)
  @Field()
  name: string;

  @Length(10)
  @Field()
  employee_code: string;

  @IsEmail()
  @Field()
  @Matches(/@elaniin\./, { message: 'Only elaniin domain is allow' })
  email: string;

  @MinLength(8)
  @MaxLength(50)
  @Field()
  password: string;

  @IsUUID('4', { each: true })
  @Field((type) => [ID], { defaultValue: [] })
  liked_spaces: string[];

  @IsUUID('4', { each: true })
  @Field((type) => [ID], { defaultValue: [] })
  reviews: string[];

  @IsUUID('4', { each: true })
  @Field((type) => [ID], { defaultValue: [] })
  bookings: string[];
}

@InputType()
export class GetUserInput {
  @Field((type) => AllowedUserKey)
  key: AllowedUserKey;

  @Field()
  value: string;
}

@InputType()
export class LikeSpaceInput {
  @IsUUID('4', { each: true })
  @Field()
  userId: string;

  @IsUUID('4', { each: true })
  @Field()
  spaceId: string;
}

@InputType()
export class AssignReviewInput {
  @IsUUID('4', { each: true })
  @Field((type) => ID)
  userId: string;

  @IsUUID('4', { each: true })
  @Field((type) => ID)
  reviewId: string;
}

@InputType()
export class AssignBookingInput {
  @IsUUID('4', { each: true })
  @Field((type) => ID)
  userId: string;

  @IsUUID('4', { each: true })
  @Field((type) => ID)
  bookingId: string;
}
