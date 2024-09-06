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
import { CookieHelper } from './helpers';
import { CustomRequest } from 'src/common/interfaces';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.register(registerDto);

    return await CookieHelper.createCookie(result, response);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.login(loginDto);

    return await CookieHelper.createCookie(result, response);
  }

  @ApiBearerAuth()
  @Get('auth-status')
  async authStatus(@Request() req: CustomRequest) {
    return await this.authService.verifyUser(req.user.sub);
  }

  @ApiBearerAuth()
  @Get('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    return await CookieHelper.clearCookie(response);
  }
}
