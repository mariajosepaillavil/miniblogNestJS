import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';
enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}
export class UserDto {
  @IsNotEmpty({
    message: 'Se requiere ingresar el parámetro nombre de manera obligatoria',
  })
  readonly name: string;

//email
  @IsNotEmpty({
    message:
      'El parámetro email no puede estar vacío. Favor agregalo para continuar',
  })
  @IsEmail({
    message: 'El email es inválido, favor reintentar',
  })
  readonly email: string;

//password
  @IsNotEmpty({
    message: 'Es mandatorio ingresar una contraseña',
  })
  @MinLength(6, {
    message:
      'Favor considera que el mensaje debe contener mínimo 6 caracteres de largo',
  })
  readonly password: string;

  //gender
  @IsNotEmpty({
    message: 'Es mandatorio ingresar un género',
  })
  @IsEnum(Gender, {
    message: 'gender must be either male or female',
  })
  readonly gender: Gender;
}

/*

import {
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsEnum,
  validateSync,
} from 'class-validator';
import { plainToClass } from 'class-transformer';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export class UserDto {
  @IsNotEmpty({ message: 'name is required' })
  readonly name: string;

  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'invalid email format' })
  readonly email: string;

  @IsNotEmpty({ message: 'password is required' })
  @MinLength(6, { message: 'password must be at least 6 characters long' })
  readonly password: string;

  @IsNotEmpty({ message: 'gender is required' })
  @IsEnum(Gender, {
    message: 'gender must be either male or female',
  })
  readonly gender: Gender;
}

// Example usage to validate
const userData = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  password: 'password123',
  gender: 'male',
};

const userDto = plainToClass(UserDto, userData);
const validationErrors = validateSync(userDto);

if (validationErrors.length > 0) {
  const errorMessage = validationErrors
    .map((error) => Object.values(error.constraints).join(', '))
    .join('; ');
  console.error(`Validation failed: ${errorMessage}`);
} else {
  console.log('Validation successful');
}
*/