import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);

    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByPhone(userDto.phone);

    if (candidate) {
      throw new HttpException(
        'Пользователь с таким телефоном существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);

    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    return {
      token: this.generateToken(user),
      user,
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByPhone(userDto.phone);
    
    console.log('🚀 ~ AuthService ~ validateUser ~ user', user);

    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({
      message: 'Некорректный телефон или пароль',
    });
  }

  private async generateToken(user: User) {
    const payload = { phone: user.phone, id: user.id, roles: user.roles };

    return {
      token: this.jwtService.sign(payload),
      user: { phone: user.phone, id: user.id, roles: user.roles },
    };
  }
}
