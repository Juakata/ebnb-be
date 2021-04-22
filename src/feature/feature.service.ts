import { v4 as uuid } from 'uuid';
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feature } from './feature.entity';
import { CreateFeatureInput } from './feature.input';

@Injectable()
export class FeatureService {
  constructor(
    @InjectRepository(Feature) private featureRepository: Repository<Feature>,
  ) {}

  async getFeature(id: string): Promise<Feature> {
    const feature = this.featureRepository.findOne({ id });
    if (!feature)
      throw new ConflictException(`Feature with id: ${id} no found`);
    return feature;
  }

  async getFeatures(): Promise<Feature[]> {
    return this.featureRepository.find();
  }

  async createFeature(
    createFeatureInput: CreateFeatureInput,
  ): Promise<Feature> {
    const feature = this.featureRepository.create({
      id: uuid(),
      ...createFeatureInput,
    });

    return this.featureRepository.save(feature);
  }

  async getManyFeatures(featuresIds: string[]): Promise<Feature[]> {
    return this.featureRepository.find({
      where: {
        id: {
          $in: featuresIds,
        },
      },
    });
  }
}
