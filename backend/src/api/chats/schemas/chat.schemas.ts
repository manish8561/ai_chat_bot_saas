import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { User } from 'src/api/users/schemas/user.schemas';

export type UserDocument = HydratedDocument<Chat>;

@Schema({ timestamps: true })
export class Chat {
  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  password: string;

  // inside the class definition
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  user: User;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
