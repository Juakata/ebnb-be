import { Field, ID, registerEnumType, ObjectType } from '@nestjs/graphql';
import { SpaceType } from '../space/space.type';

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
  email: string;

  @Field((type) => [SpaceType])
  liked_spaces: string[];
}

export enum AllowedUserKey {
  EMAIL = 'email',
  ID = 'id',
  EMPLOYEE_CODE = 'employee_code',
}

registerEnumType(AllowedUserKey, {
  name: 'AllowedUserKey',
});
