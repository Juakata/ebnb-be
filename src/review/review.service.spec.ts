import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { ReviewRepository } from './review.repository';

const mockReviewRepository = () => ({
  findOne: jest.fn(),
});

describe('FeatureService', () => {
  let reviewService;
  let reviewRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        { provide: ReviewRepository, useFactory: mockReviewRepository },
      ],
    }).compile();

    reviewService = await module.get<ReviewService>(ReviewService);
    reviewRepository = await module.get<ReviewRepository>(ReviewRepository);
  });

  it('should be defined', () => {
    expect(reviewService).toBeDefined();
  });
});
