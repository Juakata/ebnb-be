import { Module } from '@nestjs/common';
import { FeatureResolver } from './feature.resolver';
import { FeatureService } from './feature.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from './feature.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Feature])],
  providers: [FeatureResolver, FeatureService],
})
export class FeatureModule {}
