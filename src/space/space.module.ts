import { Module } from '@nestjs/common';
import { SpaceService } from './space.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Space } from './space.entity';
import { SpaceResolver } from './space.resolver';
import { FeatureModule } from '../feature/feature.module';

@Module({
  imports: [TypeOrmModule.forFeature([Space]), FeatureModule],
  providers: [SpaceService, SpaceResolver],
})
export class SpaceModule {}
