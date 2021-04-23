import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import {
  CreateUserInput,
  GetUserInput,
  LikeSpaceInput,
  AssignReviewInput,
  SignInInput,
} from './user.input';
import { AssignBookingInput } from './user.input';
import { AllowedUserKey } from './user.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
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
    const user = await this.userRepository.findOne({ [key]: value });
    if (!user) {
      throw new ConflictException(`User with ${key}: ${value} no found`);
    }
    return user;
  }

  async signIn(signInInput: SignInInput): Promise<{ accessToken: string }> {
    const { employee_code, password } = signInInput;
    const user = await this.getUser({
      key: AllowedUserKey.EMPLOYEE_CODE,
      value: employee_code,
    });

    if (!user || !(await user.validatePassword(password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.jwtService.sign({
      employee_code,
      id: user.id,
      email: user.email,
    });
    return { accessToken };
  }

  async likeSpace(likeSpaceInput: LikeSpaceInput): Promise<User> {
    const { userId, spaceId } = likeSpaceInput;
    const user = await this.userRepository.findOne({ id: userId });
    if (!user) {
      throw new ConflictException(`User with id: ${userId} no found`);
    }
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
    if (!user) {
      throw new ConflictException(`User with id: ${userId} no found`);
    }
    user.reviews = [...user.reviews, reviewId];
    return this.userRepository.save(user);
  }

  async assignBooking(assignBookingInput: AssignBookingInput): Promise<User> {
    const { userId, bookingId } = assignBookingInput;
    const user = await this.userRepository.findOne({ id: userId });
    if (!user) {
      throw new ConflictException(`User with id: ${userId} no found`);
    }

    user.bookings.push(bookingId);
    return this.userRepository.save(user);
  }
}
