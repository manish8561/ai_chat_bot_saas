import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Request,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './decorators/auth.decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
import { createCookie } from './helpers/createCookie';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.register(registerDto);

    await createCookie(result.accessToken, response);
    return result;
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response) {
    const result = await this.authService.login(loginDto);

    await createCookie(result.accessToken, response);
    const expires = new Date();

    return result;
  }

  @ApiBearerAuth()
  @Get('auth-status')
  async authStatus(@Request() req) {
    return await this.authService.verifyUser(req.user.sub);
  }
}
