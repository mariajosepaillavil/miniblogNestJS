import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../../core/constants';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {
    console.log('UsersService initialized');
  }

  async create(user: UserDto): Promise<User> {
    console.log('Se ve', await this.userRepository.create<User>(user));
    return await this.userRepository.create<User>(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }
}

//Inyectamos el repositorio de usuarios para comunicarnos con la base de datos.
