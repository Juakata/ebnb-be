import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Feature')
export class FeatureType {
  @Field((type) => ID)
  id: number;

  @Field()
  name: string;
}
