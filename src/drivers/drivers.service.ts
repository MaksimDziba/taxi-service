import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize, { FindOptions } from 'sequelize';
import { Driver } from './driver.model';
import { CreateDriverDto } from './dto/create-driver.dto';
import { DriverDto } from './dto/driver.dto';

@Injectable()
export class DriversService {
  constructor(@InjectModel(Driver) private driverRepository: typeof Driver) {}

  async createDriver(dto: CreateDriverDto) {
    const driver = await this.driverRepository.create(dto);

    return driver;
  }

  async updateDriver(driverID: number, driverDto: DriverDto) {
    const driver = await this.driverRepository.update(driverDto, {
      where: { id: driverID },
    });

    return driver;
  }

  async getDriverByValue(id: number) {
    const driver = this.driverRepository.findOne({ where: { id } });

    if (driver) {
      return driver;
    }

    throw new HttpException('Водитель не найден', HttpStatus.NOT_FOUND);
  }

  async getDriversListByValue(ids: number[]) {
    const drivers = this.driverRepository.findAll({ where: { id: ids } });

    if (drivers) {
      return drivers;
    }

    throw new HttpException('Водители не найдены', HttpStatus.NOT_FOUND);
  }

  async getAllDrivers(options) {
    const queryParams: FindOptions<Driver> = {
      include: { all: true }, // all - показать все поля.
      order: [['id', 'DESC']],
    };

    if ('search' in options) {
      queryParams.where = {
        name: sequelize.where(
          sequelize.fn('LOWER', sequelize.col('name')),
          'LIKE',
          '%' + options.search + '%',
        ),
      };
    }

    const drivers = await this.driverRepository.findAll(queryParams);

    if (drivers) {
      return drivers;
    }

    throw new HttpException('Водители не найдены', HttpStatus.NOT_FOUND);
  }

  async getDriversByPhone(phone: string) {
    const queryParams: FindOptions<Driver> = {
      include: { all: true }, // all - показать все поля.
      where: {
        name: sequelize.where(
          sequelize.fn('LOWER', sequelize.col('phone')),
          'LIKE',
          '%' + phone + '%',
        ),
      },
    };

    const drivers = await this.driverRepository.findOne(queryParams);

    if (drivers) {
      return drivers;
    }

    throw new HttpException('Водитель не найден', HttpStatus.NOT_FOUND);
  }
}
