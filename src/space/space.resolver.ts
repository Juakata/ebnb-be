import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { SpaceService } from './space.service';
import { SpaceType } from './space.type';
import { AssignFeaturesToSpace, CreateSpaceInput } from './space.input';
import { Space } from './space.entity';
import { FeatureService } from '../feature/feature.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../user/user.guard';

@Resolver((of) => SpaceType)
export class SpaceResolver {
  constructor(
    private spaceService: SpaceService,
    private featureService: FeatureService,
  ) {}

  @Query((returns) => [SpaceType])
  async spaces() {
    return this.spaceService.getSpaces();
  }

  @Query((returns) => SpaceType)
  async space(@Args('id') id: string) {
    return this.spaceService.getSpaceById(id);
  }

  @Mutation((returns) => SpaceType)
  @UseGuards(GqlAuthGuard)
  async createSpace(
    @Args('createSpaceInput') createSpaceInput: CreateSpaceInput,
  ) {
    return this.spaceService.createSpace(createSpaceInput);
  }

  @Mutation((returns) => SpaceType)
  @UseGuards(GqlAuthGuard)
  assignFeaturesToSpace(
    @Args('assignFeaturesToSpace') assignFeaturesToSpace: AssignFeaturesToSpace,
  ) {
    return this.spaceService.assignFeatureToSpace(assignFeaturesToSpace);
  }

  @ResolveField()
  async features(@Parent() space: Space) {
    return this.featureService.getManyFeatures(space.features);
  }
}
