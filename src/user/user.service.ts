import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserInput, GetUserInput, LikeSpaceInput } from './user.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const user = this.userRepository.create({
      id: uuid(),
      ...createUserInput,
    });

    return this.userRepository.save(user);
  }

  async getUser(getUserInput: GetUserInput): Promise<User> {
    const { key, value } = getUserInput;
    return this.userRepository.findOne({ [key]: value });
  }

  async likeSpace(likeSpaceInput: LikeSpaceInput): Promise<User> {
    const { userId, spaceId } = likeSpaceInput;
    const user = await this.userRepository.findOne({ id: userId });
    if (user.liked_spaces.includes(spaceId)) {
      user.liked_spaces = user.liked_spaces.filter((item) => item !== spaceId);
    } else {
      user.liked_spaces.push(spaceId);
    }

    return this.userRepository.save(user);
  }
}
