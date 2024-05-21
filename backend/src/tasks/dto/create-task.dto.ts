import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDate,
  IsNumber,
} from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  projectId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  priority: string;

  @IsOptional()
  @IsString()
  assignee: string;

  @IsOptional()
  @IsNumber()
  storyPoints: number;

  @IsOptional()
  @IsDate()
  dueDate: Date;

  @IsOptional()
  comments: string[];

  @IsOptional()
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date;
}
