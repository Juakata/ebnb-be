import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import {
  CreateUserInput,
  GetUserInput,
  LikeSpaceInput,
  AssignReviewInput,
} from './user.input';
import { AssignBookingInput } from './user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(createUserInput: CreateUserInput): Promise<User> {
    const salt = await bcrypt.genSalt();
    const user = this.userRepository.create({
      id: uuid(),
      ...createUserInput,
      password: await bcrypt.hash(createUserInput.password, salt),
      salt,
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

  async assignReview(assignReviewInput: AssignReviewInput): Promise<User> {
    const { userId, reviewId } = assignReviewInput;
    const user = await this.userRepository.findOne({ id: userId });
    if (user.reviews.includes(reviewId)) {
      throw new ConflictException('User has already this review id');
    }
    user.reviews = [...user.reviews, reviewId];
    return this.userRepository.save(user);
  }

  async assignBooking(assignBookingInput: AssignBookingInput): Promise<User> {
    const { userId, bookingId } = assignBookingInput;
    const user = await this.userRepository.findOne({ id: userId });
    if (user.bookings.includes(bookingId)) {
      throw new ConflictException('User has already this booking id');
    }
    user.bookings.push(bookingId);
    return this.userRepository.save(user);
  }
}
