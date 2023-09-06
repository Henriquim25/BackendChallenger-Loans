import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsInt()
  age: number;

  @IsString()
  @MaxLength(20)
  name: string;

  @IsInt()
  income: number;

  @IsString()
  @MaxLength(2)
  location: string;
}
