import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Repository } from 'typeorm';
import { CreateReviewInput } from './review.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
  ) {}

  async createReview(createReviewInput: CreateReviewInput): Promise<Review> {
    const { comment, rate, space } = createReviewInput;
    const review = this.reviewRepository.create({
      id: uuid(),
      comment,
      rate,
      space: space,
    });

    return this.reviewRepository.save(review);
  }

  async getReview(id: string): Promise<Review> {
    const review = this.reviewRepository.findOne({ id });
    if (!review) throw new ConflictException(`Review with id: ${id} no found`);
    return review;
  }

  async getManyReviews(reviewIds: string[]): Promise<Review[]> {
    return this.reviewRepository.find({
      where: {
        id: {
          $in: reviewIds,
        },
      },
    });
  }
}
