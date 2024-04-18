import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(['Admin', 'Project Manager', 'Team Member'])
  role: string;

  @IsOptional()
  @IsString()
  avatar: string;

  @IsOptional()
  contactInfo: {
    phone?: string;
    address?: string;
  };
}
