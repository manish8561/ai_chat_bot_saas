import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { User } from 'src/api/users/schemas/user.schemas';
import { UserChatType } from 'src/common/enums';

export type ChatDocument = HydratedDocument<Chat>;

@Schema({ timestamps: true })
export class Chat {
  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, enum: UserChatType, default: UserChatType.Question })
  chatType: number;

  // inside the class definition
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  user: User;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
