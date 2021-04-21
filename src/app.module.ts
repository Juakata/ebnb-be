import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { FeatureModule } from './feature/feature.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from './feature/feature.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/ebnb',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Feature],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    FeatureModule,
  ],
})
export class AppModule {}
