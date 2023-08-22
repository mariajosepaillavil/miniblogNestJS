import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }
  @Post('signup')
  async signUp(@Body() user: UserDto) {
    return await this.authService.create(user);
  }
}

/*POST api/v1/auth/loginllamará a @UseGuards(AuthGuard('local')). Esto tomará el correo electrónico/nombre de usuario y la contraseña del usuario, luego ejecutará el método de validación en nuestra clase de estrategia local. El login(@Request() req)generará un token JWT y lo devolverá.*/

/*El api/v1/auth/signuppunto final POST llamará al this.authService.create(user)método, creará el usuario y devolverá un token JWT. */
