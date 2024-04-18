import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'files' })
export class File {
  @Prop({ type: Types.ObjectId, ref: 'Task' })
  taskId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  uploadedBy: Types.ObjectId;

  @Prop({ required: true })
  fileName: string;

  @Prop({ required: true })
  fileURL: string;

  @Prop({ type: Date, default: Date.now })
  uploadedAt: Date;
}

export type FileDocument = File & Document;

export const FileSchema = SchemaFactory.createForClass(File);
