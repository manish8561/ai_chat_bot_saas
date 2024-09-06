import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChatDto {
  @ApiProperty({
    example: 'What is the capital of the France?',
    description: 'Message for chat',
  })
  @IsNotEmpty()
  @IsString()
  message: string;
}
