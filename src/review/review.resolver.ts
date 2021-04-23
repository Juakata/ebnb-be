import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ReviewType } from './review.type';
import { ReviewService } from './review.service';
import { Review } from './review.entity';
import { SpaceService } from '../space/space.service';

@Resolver((of) => ReviewType)
export class ReviewResolver {
  constructor(
    private reviewService: ReviewService,
    private spaceService: SpaceService,
  ) {}

  @Query((returns) => ReviewType)
  async review(@Args('id') id: string) {
    return this.reviewService.getReview(id);
  }

  @ResolveField()
  async space(@Parent() review: Review) {
    return this.spaceService.getSpaceById(review.space);
  }
}
