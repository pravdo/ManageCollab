import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File, FileDocument } from './schema/files.schema';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FilesService {
  constructor(@InjectModel(File.name) private fileModel: Model<FileDocument>) {}

  async create(createFileDto: CreateFileDto): Promise<File> {
    const newFile = new this.fileModel(createFileDto);
    return newFile.save();
  }

  async findOne(id: string): Promise<File> {
    return this.fileModel.findById(id).exec();
  }

  async remove(id: string): Promise<File> {
    return this.fileModel.findByIdAndDelete(id).exec();
  }
}
