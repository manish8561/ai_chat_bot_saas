import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateChatDto {
    @ApiProperty({
        example: 'Add new message',
        description: 'The email for login',
    })
    @IsNotEmpty()
    @IsString()
    message: string;
}
