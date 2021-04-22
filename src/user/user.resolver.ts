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
import { ReviewService } from 'src/review/review.service';
import { ReviewType } from '../review/review.type';
import { CreateReviewInput } from '../review/review.input';
import { BookingService } from '../booking/booking.service';
import { BookingType } from '../booking/booking.type';
import { CreateBookingInput } from '../booking/booking.input';

@Resolver((of) => UserType)
export class UserResolver {
  constructor(
    private userService: UserService,
    private spaceService: SpaceService,
    private reviewService: ReviewService,
    private bookingService: BookingService,
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

  @Mutation((returns) => ReviewType)
  async createReview(
    @Args('createReviewInput') createReviewInput: CreateReviewInput,
  ) {
    const { user_id } = createReviewInput;
    const review = await this.reviewService.createReview(createReviewInput);
    this.userService.assignReview({ userId: user_id, reviewId: review.id });
    return review;
  }

  @Mutation((returns) => BookingType)
  async createBooking(
    @Args('createBookingInput') createBookingInput: CreateBookingInput,
  ) {
    const { user_id } = createBookingInput;
    const booking = await this.bookingService.createBooking(createBookingInput);
    this.userService.assignBooking({ userId: user_id, bookingId: booking.id });
    return booking;
  }

  @ResolveField()
  async liked_spaces(@Parent() user: User) {
    return this.spaceService.getManySpaces(user.liked_spaces);
  }

  @ResolveField()
  async reviews(@Parent() user: User) {
    return this.reviewService.getManyReviews(user.reviews);
  }

  @ResolveField()
  async bookings(@Parent() user: User) {
    return this.bookingService.getManyBookings(user.bookings);
  }
}
