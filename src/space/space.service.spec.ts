import { Test, TestingModule } from '@nestjs/testing';
import { SpaceService } from './space.service';
import { SpaceRepository } from './space.repository';

const mockFeatureRepository = () => ({
  findOne: jest.fn(),
});

describe('FeatureService', () => {
  let spaceService;
  let spaceRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpaceService,
        { provide: SpaceRepository, useFactory: mockFeatureRepository },
      ],
    }).compile();

    spaceService = await module.get<SpaceService>(SpaceService);
    spaceRepository = await module.get<SpaceRepository>(SpaceRepository);
  });

  it('should be defined', () => {
    expect(spaceService).toBeDefined();
  });
});
