import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class ApiController {
  @Get()
  healthCheck() {
    return { success: true, message: 'OK' };
  }
}
