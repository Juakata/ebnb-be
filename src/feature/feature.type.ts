import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Feature')
export class FeatureType {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;
}
