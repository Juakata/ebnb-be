import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsDateString, IsUUID } from 'class-validator';
import { SpaceType } from '../space/space.type';

@ObjectType('Booking')
export class BookingType {
  @Field((type) => ID)
  id: string;

  @Field()
  initial_time: string;

  @Field()
  end_time: string;

  @Field()
  initial_date: string;

  @Field()
  end_date: string;

  @Field((type) => SpaceType)
  space: string;
}
