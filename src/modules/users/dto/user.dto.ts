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

  @IsNotEmpty({
    message:
      'El parámetro email no puede estar vacío. Favor agregalo para continuar',
  })
  @IsEmail({}, { message: 'El formato del email no es válido' })
  readonly email: string;

  @IsNotEmpty({ message: 'Es mandatorio ingresar una contraseña' })
  @MinLength(6, { message: 'El mínimo de carácteres aceptados es 6' })
  readonly password: string;

  @IsNotEmpty({ message: 'Es mandatorio ingresar un género' })
  @IsEnum(Gender, { message: 'Favor selecciona masculino o femenino' })
  readonly gender: Gender;
}
