import { IsNotEmpty, MinLength } from 'class-validator';
export class PostDto {
  @IsNotEmpty()
  @MinLength(4)
  readonly title: string;
  @IsNotEmpty()
  readonly body: string;
}

//Aquí, nuestro objeto de cuerpo de publicación debe tener un título, y la longitud del cuerpo y del título no debe ser inferior a 4.
