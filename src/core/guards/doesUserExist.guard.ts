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
/*  se utiliza para convertir los datos entrantes en el formato adecuado que las clases 
de la aplicación puedan entender y validar según las reglas definidas en los decoradores 
de esas clases.*/

import { validateSync } from 'class-validator'; //
/*
se usa para realizar validaciones de manera síncrona en un objeto utilizando las reglas de
 validación definidas en sus decoradores, y devuelve una lista de errores si las validaciones
no se cumplen.

=> Sin ella, la aplicación no realizará las validaciones específicas que has definido en el DTO. */

@Injectable() // Este decorador se utiliza para indicar que la clase es un servicio y que puede ser inyectada en otros componentes de NestJS, como controladores o módulos.
export class DoesUserExist implements CanActivate {
  //implementa la interfaz CanActivate. clase se utilizará como un Guard en NestJS para determinar si una solicitud (request) debe ser permitida o bloqueada.
  constructor(private readonly userService: UsersService) {}
  //En el constructor de la clase, se está inyectando una dependencia llamada userService del tipo UsersService. Esto significa que el servicio UsersService estará disponible en esta clase para que puedas utilizar sus métodos y propiedades.
  //=> En otras palabras, el código define un servicio llamado DoesUserExist que se utiliza como un Guard en NestJS. Este servicio tiene acceso a un userService proporcionado mediante inyección de dependencias, lo que le permite realizar operaciones relacionadas con usuarios (por ejemplo, verificar si un usuario ya existe) antes de que una solicitud sea procesada por un controlador.

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request): Promise<boolean> {
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

    return true;
  }
}

//El método validateRequest realiza la validación del objeto userDto utilizando las validaciones definidas en la clase UserDto. Primero, convierte el objeto de solicitud (request.body) en una instancia de UserDto utilizando plainToClass de la biblioteca class-transformer. Luego, utiliza validateSync de class-validator para validar el objeto userDto. Si hay errores de validación, se construye un mensaje de error a partir de los mensajes de restricción de validación y se lanza una excepción ForbiddenException con el mensaje de error.

//Si la validación es exitosa, verifica si el usuario ya existe en la base de datos utilizando findOneByEmail del servicio userService. Si existe, lanza una excepción ForbiddenException indicando que el correo electrónico ya existe.

//Finalmente, si la validación y verificación son exitosas, se permite la solicitud al devolver true.

//En conjunto, este código asegura que una solicitud solo sea permitida si el objeto userDto pasa la validación y si el correo electrónico del usuario no existe en la base de datos. Si alguna de estas condiciones no se cumple, se lanza una excepción y la solicitud es bloqueada.


//Síntesis: plainToClass se utiliza para convertir el objeto de solicitud (request.body) en una instancia de UserDto, aplicando las transformaciones definidas en la clase UserDto. Luego, validateSync se utiliza para validar esta instancia de UserDto y obtener posibles errores de validación.