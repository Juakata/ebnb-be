import { Test, TestingModule } from '@nestjs/testing';
import { FeatureService } from './feature.service';
import { FeatureRepository } from './feature.repository';

const mockFeatureRepository = () => ({
  findOne: jest.fn(),
});

describe('FeatureService', () => {
  let featureService;
  let featureRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeatureService,
        { provide: FeatureRepository, useFactory: mockFeatureRepository },
      ],
    }).compile();

    featureService = await module.get<FeatureService>(FeatureService);
    featureRepository = await module.get<FeatureRepository>(FeatureRepository);
  });

  it('should be defined', () => {
    expect(featureService).toBeDefined();
  });
});
