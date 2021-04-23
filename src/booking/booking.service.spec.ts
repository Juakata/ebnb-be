import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from './booking.service';
import { BookingRepository } from './booking.repository';

const mockBookingRepository = () => ({
  findOne: jest.fn(),
});

describe('BookingService', () => {
  let bookingService;
  let bookingRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingService,
        { provide: BookingRepository, useFactory: mockBookingRepository },
      ],
    }).compile();

    bookingService = await module.get<BookingService>(BookingService);
    bookingRepository = await module.get<BookingRepository>(BookingRepository);
  });

  it('should be defined', () => {
    expect(bookingService).toBeDefined();
  });
});
