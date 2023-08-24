import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // ... otros módulos importados
    JwtModule.register({
      secret: process.env.JWTKEY, // Asegúrate de proporcionar la clave correcta
    }),
  ],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService],
})
export class UsersModule {}

//Agregamos UserService a nuestra exports matriz.
//Eso es porque lo necesitaremos fuera del Módulo de usuario.
