import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/api/users/users.service';
import { compare } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import {
  INVALID_CREDENTAILS,
  USER_ALREADY_EXISTS,
  USER_NOT_FOUND,
  USER_NOT_REGISTERED,
} from 'src/common/constants/response.messages';
import { AuthResponse } from './types';
import { User } from '../users/schemas/user.schemas';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const userExist = await this.usersService.findOne(registerDto.email);
    if (userExist) {
      throw new HttpException(USER_ALREADY_EXISTS, 401);
    }
    const user = await this.usersService.create(registerDto);
    const payload = { sub: user['_id'], role: user.role };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      name: user.name,
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.usersService.findOne(loginDto.email);
    if (!user) {
      throw new HttpException(USER_NOT_REGISTERED, 401);
    }
    const isPasswordCorrect = await compare(loginDto.password, user.password);
    if (!isPasswordCorrect) {
      throw new HttpException(INVALID_CREDENTAILS, 403);
    }

    const payload = { sub: user['_id'], role: user.role };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      name: user.name,
    };
  }

  async verifyUser(id: string): Promise<User> {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new HttpException(USER_NOT_FOUND, 401);
    }
    return user;
  }
}
