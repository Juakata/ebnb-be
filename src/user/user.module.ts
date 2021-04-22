import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { SpaceModule } from '../space/space.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), SpaceModule],
  providers: [UserService, UserResolver],
})
export class UserModule {}
