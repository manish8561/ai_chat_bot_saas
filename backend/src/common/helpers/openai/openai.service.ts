import { Inject, Injectable } from '@nestjs/common';
import { OpenAI } from "openai";
@Injectable()
export class OpenAiService {
    openai: OpenAI;
    constructor(@Inject('OPENAI_MODULE_OPTIONS') private options: any) {
        this.openai = new OpenAI({ apiKey: options.openai_secret });
    }

    public async createChat(messages: any) {
        // get latest response
        const params: OpenAI.Chat.ChatCompletionCreateParams = {
            messages: messages,
            model: 'gpt-3.5-turbo',
        };
        const chatCompletion: OpenAI.Chat.ChatCompletion = await this.openai.chat.completions.create(params);

        console.log(chatCompletion, ' inside open ai service.');
        return chatCompletion;
    }
}
