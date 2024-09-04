import { Test, TestingModule } from '@nestjs/testing';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { OpenAiService } from 'src/common/helpers/openai/openai.service';

describe('ChatsController', () => {
  let controller: ChatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatsController],
      providers: [
        ChatsService,
        OpenAiService,
        {
          provide: 'OPENAI_MODULE_OPTIONS',
          useValue: { openai_secret: 'test-secret' },
        },
      ],
    }).compile();

    controller = module.get<ChatsController>(ChatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
