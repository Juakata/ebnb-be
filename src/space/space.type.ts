import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { FeatureType } from '../feature/feature.type';

@ObjectType('Space')
export class SpaceType {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field((type) => AllowedType)
  type: AllowedType;

  @Field()
  place: string;

  @Field()
  image: string;

  @Field()
  capacity: number;

  @Field((type) => [FeatureType])
  features: string[];
}

export enum AllowedType {
  SALAS,
  AMENIDADES,
  EXPERIENCIAS,
}

registerEnumType(AllowedType, {
  name: 'AllowedType',
});
