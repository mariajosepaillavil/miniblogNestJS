import { Injectable, Inject, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../../core/constants';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    private readonly jwtService: JwtService,
  ) {
    console.log('UsersService initialized');
  }

  async create(user: UserDto): Promise<User> {
    if (await this.isEmailRegistered(user.email)) {
      throw new BadRequestException('El correo electrónico ya está registrado');
    }

    const hashedPassword = await this.hashPassword(user.password);

    const newUser = await this.userRepository.create<User>({
      ...user,
      password: hashedPassword,
    });

    return newUser;
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }

  private async isEmailRegistered(email: string): Promise<boolean> {
    const existingUser = await this.userRepository.findOne<User>({ where: { email } });
    return !!existingUser;
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }

  private async generateToken(user) {
    const token = await this.jwtService.signAsync(user, {
      secret: process.env.JWTKEY,
    });
    return token;
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }
}

//Inyectamos el repositorio de usuarios para comunicarnos con la base de datos.
