import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingService } from './booking.service';
import { Booking } from './booking.entity';
import { SpaceModule } from '../space/space.module';
import { BookingResolver } from './booking.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), SpaceModule],
  providers: [BookingService, BookingResolver],
  exports: [BookingService],
})
export class BookingModule {}
