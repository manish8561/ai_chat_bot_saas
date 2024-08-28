import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'johncarter@gmail.com',
    description: 'The email for login',
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    example: 'john@123',
    description: 'The password for login',
  })
  @IsNotEmpty()
  password: string;
}
