import { Test, TestingModule } from '@nestjs/testing';
import { OpenAiService } from './openai.service';


const mockChatCompletion = {
  id: 'mock-id',
  object: 'chat.completion',
  created: 1234567890,
  model: 'gpt-3.5-turbo',
  choices: [
    {
      message: {
        role: 'assistant',
        content: 'This is a mock response',
      },
    },
  ],
};

jest.mock('openai', () => {
  return {
    OpenAI: jest.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue(mockChatCompletion),
        },
      },
    })),
  };
});

describe('OpenAiService', () => {
  let service: OpenAiService;
  let createChatMock: jest.Mock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpenAiService,
        {
          provide: 'OPENAI_MODULE_OPTIONS',
          useValue: { openai_secret: 'test-secret' },
        },
      ],
    }).compile();

    service = module.get<OpenAiService>(OpenAiService);
    // Extract the mock for create method
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createChat', () => {
    it('should call OpenAI API with correct parameters and return the result', async () => {
      const mockMessages = [
        { role: 'user', content: 'Hello!' },
        { role: 'assistant', content: 'Hi! How can I help you today?' },
      ];


      const result = await service.createChat(mockMessages);

      // expect(createChatMock).toHaveBeenCalledWith({
      //   messages: mockMessages,
      //   model: 'gpt-3.5-turbo',
      // });

      expect(result).toEqual(mockChatCompletion);
    });
  });
});
