import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Space } from './space.entity';
import { CreateSpaceInput, AssignFeaturesToSpace } from './space.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class SpaceService {
  constructor(
    @InjectRepository(Space) private spaceRepository: Repository<Space>,
  ) {}

  async createSpace(createSpaceInput: CreateSpaceInput): Promise<Space> {
    const space = this.spaceRepository.create({
      id: uuid(),
      ...createSpaceInput,
    });

    return this.spaceRepository.save(space);
  }

  async getSpaces(): Promise<Space[]> {
    return this.spaceRepository.find();
  }

  async getSpaceById(id: string): Promise<Space> {
    const space = this.spaceRepository.findOne({ id });
    if (!space) {
      throw new ConflictException(`Space with id: ${id} no found`);
    }
    return space;
  }

  async assignFeatureToSpace(
    assignFeaturesToSpace: AssignFeaturesToSpace,
  ): Promise<Space> {
    const space = await this.spaceRepository.findOne({
      id: assignFeaturesToSpace.space_id,
    });
    if (!space) {
      throw new ConflictException(
        `Space with id: ${assignFeaturesToSpace.space_id} no found`,
      );
    }
    space.features = [
      ...new Set(...[...space.features, ...assignFeaturesToSpace.features]),
    ];
    return this.spaceRepository.save(space);
  }

  async getManySpaces(spaceIds: string[]): Promise<Space[]> {
    return this.spaceRepository.find({
      where: {
        id: {
          $in: spaceIds,
        },
      },
    });
  }
}
