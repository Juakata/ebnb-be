import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserType } from './user.type';
import { UserService } from './user.service';
import { CreateUserInput, GetUserInput, LikeSpaceInput } from './user.input';
import { SpaceService } from '../space/space.service';
import { User } from './user.entity';

@Resolver((of) => UserType)
export class UserResolver {
  constructor(
    private userService: UserService,
    private spaceService: SpaceService,
  ) {}

  @Query((returns) => UserType)
  async user(@Args('getUserInput') getUserInput: GetUserInput) {
    return this.userService.getUser(getUserInput);
  }

  @Mutation((returns) => UserType)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.createUser(createUserInput);
  }

  @Mutation((returns) => UserType)
  async likeSpace(@Args('likeSpaceInput') likeSpaceInput: LikeSpaceInput) {
    return this.userService.likeSpace(likeSpaceInput);
  }

  @ResolveField()
  async liked_spaces(@Parent() user: User) {
    return this.spaceService.getManySpaces(user.liked_spaces);
  }
}
