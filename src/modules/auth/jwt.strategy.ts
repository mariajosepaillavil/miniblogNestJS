import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWTKEY,
    });
  }
  async validate(payload: any) {
    // check if user in the token actually exist
    const user = await this.userService.findOneById(payload.id);
    if (!user) {
      throw new UnauthorizedException(
        'You are not authorized to perform the operation',
      );
    }
    return payload;
  }
}

/* Aquí, estamos extendiendo PassportStrategy.Dentro del super()objeto que agregamos 
algunas opciones. En nuestro caso, estas opciones son:

jwtFromRequest:proporciona el método mediante el cual se extraerá el JWT del archivo
Request. Usaremos el enfoque estándar de proporcionar un token de portador en el 
encabezado de Autorización de nuestras solicitudes de API.

ignoreExpiration: solo para ser explícitos, elegimos la falseconfiguración 
predeterminada, que delega la responsabilidad de garantizar que un JWT no haya caducado al módulo Passport. 

Esto significa que si nuestra ruta se proporciona con un JWT vencido, la solicitud será denegada y 401 Unauthorizedse enviará una respuesta. Passport maneja convenientemente esto automáticamente para nosotros.

secretOrKey: Esta es nuestra clave secreta para el token. Esto usará la clave secreta en nuestro .envarchivo.

Para validate(payload: any)la estrategia jwt, Passport primero verifica la firma del JWT y decodifica el JSON. 

Luego invoca nuestro validate()método pasando el JSON decodificado como su único parámetro. Según la forma en que funciona la firma JWT, tenemos la garantía de que estamos recibiendo un token válido que hemos firmado y emitido previamente a un usuario válido. 

Confirmamos si el usuario existe con el ID de carga útil del usuario. Si el usuario existe, devolvemos el objeto de usuario y Passport lo adjuntará como una propiedad en el Requestobjeto. Si el usuario no existe, lanzamos una excepción.*/
