import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { FeatureModule } from './feature/feature.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from './feature/feature.entity';
import { SpaceModule } from './space/space.module';
import { Space } from './space/space.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/ebnb',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Feature, Space],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    FeatureModule,
    SpaceModule,
  ],
})
export class AppModule {}
