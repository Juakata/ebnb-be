import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { SpaceModule } from '../space/space.module';
import { ReviewModule } from '../review/review.module';
import { BookingModule } from '../booking/booking.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'myreallyfificulttokensecret',
      signOptions: {
        expiresIn: 86400,
      },
    }),
    TypeOrmModule.forFeature([User]),
    SpaceModule,
    ReviewModule,
    BookingModule,
  ],
  providers: [UserService, UserResolver, JwtStrategy],
  exports: [UserService, JwtStrategy, PassportModule],
})
export class UserModule {}
