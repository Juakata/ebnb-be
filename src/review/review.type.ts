import { Field, ID, ObjectType } from '@nestjs/graphql';
import { SpaceType } from '../space/space.type';

@ObjectType('Review')
export class ReviewType {
  @Field((type) => ID)
  id: string;

  @Field()
  comment: string;

  @Field()
  rate: number;

  @Field((type) => SpaceType)
  space: string;
}
