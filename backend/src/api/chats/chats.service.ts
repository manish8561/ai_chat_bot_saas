import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { OpenAiService } from 'src/common/helpers/openai/openai.service';
import { UserChatType } from 'src/common/enums';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './schemas/chat.schemas';
import { Model } from 'mongoose';
import { ChatEntity } from './entities/chat.entity';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
    private openAiSerivce: OpenAiService,
  ) {}

  async create(createChatDto: CreateChatDto, user: string) {
    const questionObj: ChatEntity = {
      user,
      chatType: UserChatType.Question,
      role: 'user',
      content: createChatDto.message,
    };
    const answerObj: ChatEntity = {
      user,
      chatType: UserChatType.Answer,
      role: 'assistant',
      content: '',
    };

    const completion = await this.openAiSerivce.createChat([
      { role: 'system', content: 'You are a helpful assistant.' },
      {
        role: 'user',
        content: 'What is the capital of the France?',
      },
    ]);
    console.log('----------------chat service 2--------------');

    console.log(completion.choices[0].message);
    if (completion.choices[0].message) {
      const message = completion.choices[0].message;

      answerObj.role = message.role;
      answerObj.content = message.content;
    } else {
      answerObj.content = 'Error from openapi';
    }

    await this.chatModel.insertMany([questionObj, answerObj]);
    return answerObj;
  }

  findAll(user: string): Promise<Chat[]> {
    return this.chatModel.find({ user }).exec();
  }

  async remove(user: string): Promise<any> {
    return await this.chatModel.deleteMany({ user }).exec();
  }
}
