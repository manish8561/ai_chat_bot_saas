import { Test, TestingModule } from '@nestjs/testing';
import { ChatsService } from './chats.service';
import { OpenAiService } from 'src/common/helpers/openai/openai.service';
import { getModelToken } from '@nestjs/mongoose';
import { Chat } from './schemas/chat.schemas';

describe('ChatsService', () => {
  let service: ChatsService;

  const mockChat = {
    _id: 'mockId',
    role: 'user',
    content: 'mock message from openai',
    user: 'mockUserId',
  };

  const mockChatModel: any = jest.fn().mockImplementation(() => ({
    save: jest.fn().mockResolvedValue(mockChat),
  }));

  mockChatModel.insertMany = jest.fn().mockResolvedValue(undefined);

  mockChatModel.find = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue([mockChat]),
  });

  mockChatModel.findOne = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockChat),
  });

  mockChatModel.updateOne = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue({ modifiedCount: 1 }),
  });

  mockChatModel.deleteOne = jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue({ deletedCount: 1 }),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatsService,
        {
          provide: getModelToken(Chat.name),
          useValue: mockChatModel,
        },
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
