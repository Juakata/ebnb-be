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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.2eijv.mongodb.net/test`,
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
