import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { ReviewResolver } from './review.resolver';
import { ReviewService } from './review.service';
import { SpaceModule } from '../space/space.module';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), SpaceModule],
  providers: [ReviewService, ReviewResolver],
  exports: [ReviewService],
})
export class ReviewModule {}
