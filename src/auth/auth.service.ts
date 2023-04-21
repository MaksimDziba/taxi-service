import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { CreateUserDto } from '../users/dto/create-user.dto';

import { UsersService } from '../users/users.service';
import { ClientsService } from '../clients/clients.service';
import { DriversService } from '../drivers/drivers.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private readonly clientsService: ClientsService,
    private readonly driversService: DriversService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);

    return this.generateUser(user, userDto.role);
  }

  async registration(
    userDto: CreateUserDto,
  ): Promise<{ token: string; user: Record<string, any> }> {
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

    if (userDto.role === 'client') {
      await this.clientsService.createClient({
        name: user.phone,
        phone: user.phone,
      });
    } else if (userDto.role === 'driver') {
      await this.driversService.createDriver({
        name: user.phone,
        passport: '',
        address: '',
        driverLicense: '',
        contractNumber: null,
        paymentMethod: '',
        transportationAnimals: null,
        phone: user.phone,
      });
    }

    return this.generateUser(user, userDto.role);
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByPhone(userDto.phone);

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

  private async generateToken(user) {
    const { id, phone, role } = user;

    return this.jwtService.sign({ id, phone, role });
  }

  private async generateUser(user, role) {
    user = {
      ...user.toJSON(),
      role,
    };

    delete user.roles;

    const token = await this.generateToken(user);

    return {
      token,
      user,
    };
  }
}
