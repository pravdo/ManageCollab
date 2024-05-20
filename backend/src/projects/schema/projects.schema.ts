import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ collection: 'projects' })
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ enum: ['Active', 'Completed', 'On Hold'], default: 'Active' })
  status: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  members: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  projectManager: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }] })
  tasks: Types.ObjectId[];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export type ProjectDocument = Project & Document;

export const ProjectSchema = SchemaFactory.createForClass(Project);
