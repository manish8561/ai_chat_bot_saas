import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { OpenAiService } from './openai.service';

interface OpenAiModuleOptions {
  openai_orgainsation_id: string;
  openai_secret: string;
}

@Global()
@Module({})
export class OpenAiModule {
  static forRootAsync(options: {
    useFactory: (...args: any[]) => Promise<OpenAiModuleOptions> | OpenAiModuleOptions;
    inject?: any[];
  }): DynamicModule {
    const asyncProvider: Provider = {
      provide: 'OPENAI_MODULE_OPTIONS',
      useFactory: options.useFactory,
      inject: options.inject || [],
    };

    return {
      module: OpenAiModule,
      imports: [OpenAiModule],
      providers: [asyncProvider, OpenAiService],
      exports: [asyncProvider, OpenAiService],
    };
  }
}
