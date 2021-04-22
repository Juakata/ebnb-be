import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { SpaceModule } from '../space/space.module';
import { ReviewModule } from '../review/review.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), SpaceModule, ReviewModule],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
