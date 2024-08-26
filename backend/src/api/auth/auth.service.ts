import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/api/users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginDto: LoginDto): Promise<any> {
    const user = await this.usersService.findOne(loginDto.email);
    if (user?.password !== loginDto.password) {
      throw new UnauthorizedException();
    }

    // TODO: Generate a JWT and return it here
    // instead of the user object
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
