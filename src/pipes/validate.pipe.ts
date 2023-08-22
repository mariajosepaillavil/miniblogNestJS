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
        // Verificar si e.message es una cadena antes de acceder a e.message.message
        const errorMessage = typeof e.message === 'string' ? e.message : '';
        throw new UnprocessableEntityException(this.handleError(errorMessage));
      }
    }
  }

  private handleError(errors) {
    return errors.map((error) => error.constraints);
  }
}
