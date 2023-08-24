import {
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class ValidateInputPipe extends ValidationPipe {
  public async transform(value, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (e) {
      if (e instanceof BadRequestException) {
        console.log(e);
        throw new UnprocessableEntityException(e['response']);
      }
    }
  }

  private handleError(errors) {
    return errors.map((error) => error.constraints);
  }
}

// ValidateInputPipe se utiliza para personalizar el manejo de errores durante la validación de entradas en NestJS. Si ocurre un error de validación, convierte los errores en mensajes de error más simples y lanza una excepción diferente (UnprocessableEntityException) para mostrar un mensaje más claro al usuario.
