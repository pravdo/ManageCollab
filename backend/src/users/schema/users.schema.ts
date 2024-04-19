import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'users' })
export class User {
  toObject(): { [x: string]: any; password: any } {
    throw new Error('Method not implemented.');
  }
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['Admin', 'Project Manager', 'Member'] })
  role: string;

  @Prop({ default: '' })
  avatar: string;

  @Prop({
    type: {
      phone: { type: String, default: '' },
      address: { type: String, default: '' },
    },
    _id: false, // Do not generate a subdocument _id for contactInfo
    default: {},
  })
  contactInfo: Record<string, any>;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
