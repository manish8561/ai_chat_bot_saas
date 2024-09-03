import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { ApiModule } from './api/api.module';
import { OpenAiModule } from './common/helpers/openai/openai.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        retryAttempts: 3,
      }),
    }),
    OpenAiModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          openai_orgainsation_id: configService.get<string>('OPENAI_ORGANIZATION_ID'),
          openai_secret: configService.get<string>('OPENAI_SECRET'),
        };
      },
      inject: [ConfigService],
    }),

    AuthModule,
    ApiModule,
  ],
})
export class AppModule { }
