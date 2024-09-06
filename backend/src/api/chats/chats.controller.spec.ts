import { Test, TestingModule } from '@nestjs/testing';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { OpenAiService } from 'src/common/helpers/openai/openai.service';

describe('ChatsController', () => {
  let controller: ChatsController;

  const mockChat = {
    _id: 'mockId',
    role: 'user',
    content: 'mock message from openai',
    user: 'mockUserId',
  };

  const mockChatService = {
    create: jest.fn().mockResolvedValue(mockChat),
    findAll: jest.fn().mockResolvedValue([mockChat]),
    findById: jest.fn().mockResolvedValue(mockChat),
    update: jest.fn().mockResolvedValue({ modifiedCount: 1 }),
    remove: jest.fn().mockResolvedValue({ deletedCount: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatsController],
      providers: [
        {
          provide: ChatsService,
          useValue: mockChatService,
        },
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
