import { Field, ID, registerEnumType, ObjectType } from '@nestjs/graphql';
import { SpaceType } from '../space/space.type';
import { ReviewType } from '../review/review.type';
import { BookingType } from '../booking/booking.type';

@ObjectType('User')
export class UserType {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  employee_code: string;

  @Field()
  password: string;

  @Field()
  salt: string;

  @Field()
  email: string;

  @Field((type) => [SpaceType])
  liked_spaces: string[];

  @Field((type) => [ReviewType])
  reviews: string[];

  @Field((type) => [BookingType])
  bookings: string[];
}

export enum AllowedUserKey {
  EMAIL = 'email',
  ID = 'id',
  EMPLOYEE_CODE = 'employee_code',
}

registerEnumType(AllowedUserKey, {
  name: 'AllowedUserKey',
});
