import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFileDto {
  @IsNotEmpty()
  @IsString()
  taskId: string;

  @IsNotEmpty()
  @IsString()
  uploadedBy: string;

  @IsNotEmpty()
  @IsString()
  fileName: string;

  @IsNotEmpty()
  @IsString()
  fileURL: string;
}
