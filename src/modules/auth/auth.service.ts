import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      return null;
    }

    const passwordMatch = await this.comparePassword(password, user.password);
    if (!passwordMatch) {
      return null;
    }

    const { password: userPassword, ...userData } = user['dataValues'];
    return userData;
  }

  public async login(user) {
    const token = await this.generateToken(user);
    return { user, token };
  }

  public async create(newUser) {
    try {
      const hashedPassword = await this.hashPassword(newUser.password);

      const createdUser = await this.userService.create({
        ...newUser,
        password: hashedPassword,
      });

      const { password, ...userResult } = createdUser['dataValues'];
      const token = await this.generateToken(userResult);

      return { newUser: userResult, user: userResult, token };
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        console.error('Email ya existe:', newUser.email);
        throw new BadRequestException(
          'El correo electrónico ya está registrado',
        );
      }

      console.error(error);
      throw new InternalServerErrorException('Error creando usuario');
    }
  }

  private async generateToken(user) {
    try {
      const token = await this.jwtService.signAsync(user, {
        secret: process.env.JWTKEY,
      });
      return token;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error generando token');
    }
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const passwordMatch = await bcrypt.compare(enteredPassword, dbPassword);
    return passwordMatch;
  }
}
