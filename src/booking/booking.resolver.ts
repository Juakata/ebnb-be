import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { BookingType } from './booking.type';
import { SpaceService } from '../space/space.service';
import { BookingService } from './booking.service';
import { CreateBookingInput } from './booking.input';
import { Booking } from './booking.entity';

@Resolver((of) => BookingType)
export class BookingResolver {
  constructor(
    private spaceService: SpaceService,
    private bookingService: BookingService,
  ) {}

  @Query((returns) => BookingType)
  booking(@Args('createBookingInput') CreateBookingInput: CreateBookingInput) {
    return this.bookingService.createBooking(CreateBookingInput);
  }

  @ResolveField()
  space(@Parent() booking: Booking) {
    return this.spaceService.getSpaceById(booking.space);
  }
}
