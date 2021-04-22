import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { CreateBookingInput } from './booking.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking) private bookingRepository: Repository<Booking>,
  ) {}

  async createBooking(
    createBookingInput: CreateBookingInput,
  ): Promise<Booking> {
    const {
      initial_date,
      end_date,
      initial_time,
      end_time,
      space,
    } = createBookingInput;
    const booking = this.bookingRepository.create({
      id: uuid(),
      initial_date,
      end_date,
      initial_time,
      end_time,
      space,
    });

    return this.bookingRepository.save(booking);
  }

  async getBooking(id: string): Promise<Booking> {
    return this.bookingRepository.findOne({ id });
  }

  async getManyBookings(bookingIds: string[]): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: {
        id: {
          $in: bookingIds,
        },
      },
    });
  }
}
