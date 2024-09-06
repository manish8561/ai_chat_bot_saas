import { Inject, Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
@Injectable()
export class OpenAiService {
  openai: OpenAI;
  constructor(@Inject('OPENAI_MODULE_OPTIONS') private options: any) {
    this.openai = new OpenAI({ apiKey: options.openai_secret });
  }

  public async createChat(messages: any) {
    console.log('----------------openservice--------------');
    console.log(messages);
    // get latest response
    // const params: OpenAI.Chat.ChatCompletionCreateParams = {
    //   messages: messages,
    //   model: 'gpt-3.5-turbo',
    // };
    // const chatCompletion: OpenAI.Chat.ChatCompletion =
    //   await this.openai.chat.completions.create(params);

    const chatCompletion = {
      id: 'chatcmpl-7aBTkkSW8CvYJeiK98QylGthKLqkz',
      object: 'chat.completion',
      created: 1684437431,
      model: 'gpt-3.5-turbo-0301',
      usage: {
        prompt_tokens: 14,
        completion_tokens: 7,
        total_tokens: 21,
      },
      choices: [
        {
          message: {
            role: 'assistant',
            content: 'The capital of France is Paris.',
          },
          finish_reason: 'stop',
          index: 0,
        },
      ],
    };
    console.log('----------------openservice response--------------');

    console.log(chatCompletion, ' inside open ai service.');
    return chatCompletion;
  }
}
