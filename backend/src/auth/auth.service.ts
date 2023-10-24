import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from 'src/types/user';
import { SignUpDto } from './signup.dto';
import { LoginDTO } from 'src/auth/login.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}
  private readonly logger = new Logger(AuthService.name);

  async signPayload(payload: any) {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
  }

  async create(signUpDto: SignUpDto) {
    const { email } = signUpDto;
    const user = await this.userModel.findOne({ email });

    if (user) {
      this.logger.error('Could not create! User already exists.');
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const createdUser = new this.userModel(signUpDto);
    await createdUser.save();

    this.logger.log('User created successfully.');
    return this.sanitizeUser(createdUser);
  }

  async findByLogin(loginDto: LoginDTO) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      this.logger.error('Could not find! User does not exist.');
      throw new HttpException("User doesn't exist", HttpStatus.BAD_REQUEST);
    }

    if (await bcrypt?.compare(password, user.password)) {
      this.logger.log('User signed in.');
      return this.sanitizeUser(user);
    } else {
      this.logger.error('Could not sign in! Invalid credentials.');
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }
  }

  sanitizeUser(user: User) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }
}
