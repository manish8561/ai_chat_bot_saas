import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'john carter',
    description: 'The email for login',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

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
