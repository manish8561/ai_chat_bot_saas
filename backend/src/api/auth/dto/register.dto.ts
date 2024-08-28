import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'john carter',
    description: 'The name for register',
  })
  @IsString()
  name: string;
  @ApiProperty({
    example: 'johncarter@gmail.com',
    description: 'The email for register',
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    example: 'john@123',
    description: 'The password for register',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
