import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feature } from './feature.entity';
import { CreateFeatureInput } from './feature.input';

@Injectable()
export class FeatureService {
  constructor(
    @InjectRepository(Feature) private featureRepository: Repository<Feature>,
  ) {}

  async getFeature(id): Promise<Feature> {
    return this.featureRepository.findOne({ id });
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
