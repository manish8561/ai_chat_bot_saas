import { Controller, Get } from '@nestjs/common';
import { Public } from './auth/decorators/auth.decorators';

@Controller('api')
export class ApiController {
  @Public()
  @Get('healthcheck')
  healthCheck() {
    return { message: 'OK', time: Date.now() };
  }
}
