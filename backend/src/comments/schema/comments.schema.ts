import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'comments' })
export class Comment {
  @Prop({ type: Types.ObjectId, ref: 'Task' })
  taskId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  author: Types.ObjectId;

  @Prop({ required: true })
  text: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export type CommentDocument = Comment & Document;

export const CommentSchema = SchemaFactory.createForClass(Comment);
