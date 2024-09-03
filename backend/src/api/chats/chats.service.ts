import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { OpenAiService } from 'src/common/helpers/openai/openai.service';

@Injectable()
export class ChatsService {
  constructor(private openAiSerivce: OpenAiService) { }
  async create(createChatDto: CreateChatDto) {
    console.log(createChatDto);
    const completion = await this.openAiSerivce.createChat(
      [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: "Write a haiku about recursion in programming.",
        },
      ]);

    console.log(completion.choices[0].message,' inside chat service.');
    return 'This action adds a new chat';
  }

  findAll() {
    return `This action returns all chats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
