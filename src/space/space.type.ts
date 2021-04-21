import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

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
}

export enum AllowedType {
  SALAS,
  AMENIDADES,
  EXPERIENCIAS,
}

registerEnumType(AllowedType, {
  name: 'AllowedType',
});
