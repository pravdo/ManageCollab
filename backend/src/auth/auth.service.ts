import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { User } from 'src/users/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (isMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: User): Promise<{ access_token: string; user: any }> {
    const userObject = user.toObject ? user.toObject() : user;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = userObject;

    const payload = { username: result.email, sub: result._id };
    return {
      access_token: this.jwtService.sign(payload),
      user: result,
    };
  }

  async register(registerDto: RegisterDto): Promise<any> {
    // Check if the user already exists
    const userExists = await this.usersService.findOneByEmail(
      registerDto.email,
    );
    if (userExists) {
      throw new BadRequestException('Email already in use.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const createdUser = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
      avatar: '',
      contactInfo: {
        phone: '',
        address: '',
      },
    });

    if (createdUser) {
      const userObject = createdUser.toObject();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = userObject;
      return result;
    } else {
      throw new Error('User could not be created');
    }
  }
}
