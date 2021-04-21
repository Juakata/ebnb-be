import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Space } from './space.entity';
import { CreateSpaceInput } from './space.input';
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
    return this.spaceRepository.findOne({ id });
  }
}
