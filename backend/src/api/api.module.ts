import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.gaurd';
import { RolesGuard } from 'src/common/helpers/role/role.gaurd';
import { ChatsModule } from './chats/chats.module';

@Module({
  controllers: [ApiController],
  imports: [UsersModule, ChatsModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class ApiModule {}
