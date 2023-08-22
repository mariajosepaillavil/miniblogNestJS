import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';

@Module({
  providers: [UsersService, ...usersProviders],
  exports: [UsersService],
})
export class UsersModule {}

//Agregamos UserService a nuestra exports matriz.
//Eso es porque lo necesitaremos fuera del Módulo de usuario.
