import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SpaceService } from './space.service';
import { SpaceType } from './space.type';
import { CreateSpaceInput } from './space.input';

@Resolver((of) => SpaceType)
export class SpaceResolver {
  constructor(private spaceService: SpaceService) {}

  @Query((returns) => [SpaceType])
  async spaces() {
    return this.spaceService.getSpaces();
  }

  @Query((returns) => SpaceType)
  async space(@Args('id') id: string) {
    return this.spaceService.getSpaceById(id);
  }

  @Mutation((returns) => SpaceType)
  async createSpace(
    @Args('createSpaceInput') createSpaceInput: CreateSpaceInput,
  ) {
    return this.spaceService.createSpace(createSpaceInput);
  }
}
