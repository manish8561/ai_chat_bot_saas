import { Test, TestingModule } from '@nestjs/testing';
import { ChatsService } from './chats.service';
import { OpenAiService } from 'src/common/helpers/openai/openai.service';

describe('ChatsService', () => {
  let service: ChatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatsService,
        OpenAiService,
        {
          provide: 'OPENAI_MODULE_OPTIONS',
          useValue: { openai_secret: 'test-secret' },
        },
      ],
    }).compile();

    service = module.get<ChatsService>(ChatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
