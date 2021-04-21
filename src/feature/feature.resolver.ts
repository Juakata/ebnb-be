import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FeatureType } from './feature.type';
import { FeatureService } from './feature.service';
import { CreateFeatureInput } from './feature.input';

@Resolver((of) => FeatureType)
export class FeatureResolver {
  constructor(private featureService: FeatureService) {}

  @Query((returns) => FeatureType)
  feature(@Args('id') id: string) {
    return this.featureService.getFeature(id);
  }

  @Query((returns) => [FeatureType])
  features() {
    return this.featureService.getFeatures();
  }

  @Mutation((returns) => FeatureType)
  createFeature(
    @Args('createFeatureInput') createFeatureInput: CreateFeatureInput,
  ) {
    return this.featureService.createFeature(createFeatureInput);
  }
}
