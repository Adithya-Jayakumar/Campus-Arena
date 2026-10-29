import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsIn } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Please provide a valid college email address' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Full name is required' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Department is required (e.g. CSE, ECE, MECH)' })
  department: string;

  @IsOptional()
  @IsString()
  studentId?: string;

  @IsOptional()
  @IsIn(['STUDENT', 'FACULTY', 'ADMIN'])
  role?: string;
}

export class LoginDto {
  @IsEmail({}, { message: 'Please provide a valid email' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
