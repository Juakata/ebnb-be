import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { FeatureModule } from './feature/feature.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from './feature/feature.entity';
import { SpaceModule } from './space/space.module';
import { Space } from './space/space.entity';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { ReviewModule } from './review/review.module';
import { Review } from './review/review.entity';
import { BookingModule } from './booking/booking.module';
import { Booking } from './booking/booking.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/ebnb',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Feature, Space, User, Review, Booking],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    FeatureModule,
    SpaceModule,
    UserModule,
    ReviewModule,
    BookingModule,
  ],
})
export class AppModule {}
