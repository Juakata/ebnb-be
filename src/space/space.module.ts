import { Module } from '@nestjs/common';
import { SpaceService } from './space.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Space } from './space.entity';
import { SpaceResolver } from './space.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Space])],
  providers: [SpaceService, SpaceResolver],
})
export class SpaceModule {}
