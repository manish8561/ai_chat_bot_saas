import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { UserStatus } from 'src/common/enums';
import { Role } from 'src/common/role/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @ApiProperty({ example: 'john carter', description: 'The name of the user' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    example: 'johncarter@gmail.com',
    description: 'The email of the user',
  })
  @Prop({ required: true })
  email: string;

  @ApiProperty({
    example: 'johncarter@123',
    description: 'The password of the user',
  })
  @Prop({ required: true })
  password: string;

  @ApiProperty({
    example: Role.User,
    description: 'The role of the user',
  })
  @Prop({ required: true, default: Role.User })
  role: string;

  @ApiProperty({
    example: UserStatus.Active,
    description: 'The status of the user',
  })
  @Prop({ required: true, default: UserStatus.Active })
  status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
