import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDate,
  IsArray,
} from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsDate()
  startDate: Date;

  @IsOptional()
  @IsDate()
  endDate: Date;

  @IsOptional()
  @IsString()
  status: string;

  @IsArray()
  members: string[];

  @IsNotEmpty()
  @IsString()
  projectManager: string;
}
