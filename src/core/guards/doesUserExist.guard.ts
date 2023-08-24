import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../../modules/users/users.service';
import { UserDto } from 'src/modules/users/dto/user.dto';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

@Injectable() //Toda la clase, la puedo inyectar en otra clase
export class DoesUserExist implements CanActivate {
  constructor(private readonly userService: UsersService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }
  //Este método canActivate es parte de la clase DoesUserExist, la cual implementa la interfaz CanActivate. Aquí se determina si una solicitud (request) debe ser permitida o bloqueada. En este caso, el método obtiene el objeto request de la solicitud actual a través del contexto proporcionado por context.switchToHttp().getRequest(). Luego, se llama al método validateRequest(request) para realizar la validación antes de permitir la solicitud.

  async validateRequest(request): Promise<boolean> {
    try {
      const userDto = plainToClass(UserDto, request.body);
      const validationErrors = validateSync(userDto);

      if (validationErrors.length > 0) {
        const errorMessage = validationErrors
          .map((error) => Object.values(error.constraints).join(', '))
          .join('; ');
        throw new ForbiddenException(`Validation failed: ${errorMessage}`);
      }

      const userExist = await this.userService.findOneByEmail(userDto.email);
      if (userExist) {
        throw new ForbiddenException('This email already exists');
      }


      // Now, also check if the email exists in the database before insertion => No funciona.
      const userByEmail = await this.userService.findOneByEmail(userDto.email);
      if (userByEmail) {
        throw new ForbiddenException('This email already exists');
      }

      return true;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }
}
//El método validateRequest realiza la validación del objeto userDto utilizando las validaciones definidas en la clase UserDto. Primero, convierte el objeto de solicitud (request.body) en una instancia de UserDto utilizando plainToClass de la biblioteca class-transformer. Luego, utiliza validateSync de class-validator para validar el objeto userDto. Si hay errores de validación, se construye un mensaje de error a partir de los mensajes de restricción de validación y se lanza una excepción ForbiddenException con el mensaje de error.

//Si la validación es exitosa, verifica si el usuario ya existe en la base de datos utilizando findOneByEmail del servicio userService. Si existe, lanza una excepción ForbiddenException indicando que el correo electrónico ya existe.

//Finalmente, si la validación y verificación son exitosas, se permite la solicitud al devolver true.

//En conjunto, este código asegura que una solicitud solo sea permitida si el objeto userDto pasa la validación y si el correo electrónico del usuario no existe en la base de datos. Si alguna de estas condiciones no se cumple, se lanza una excepción y la solicitud es bloqueada.

//Síntesis: plainToClass se utiliza para convertir el objeto de solicitud (request.body) en una instancia de UserDto, aplicando las transformaciones definidas en la clase UserDto. Luego, validateSync se utiliza para validar esta instancia de UserDto y obtener posibles errores de validación.
