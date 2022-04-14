import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize, { FindOptions } from 'sequelize';
import { Driver } from './driver.model';
import { CreateDriverDto } from './dto/create-driver.dto';

@Injectable()
export class DriversService {
  constructor(@InjectModel(Driver) private driverRepository: typeof Driver) {}

  async createDriver(dto: CreateDriverDto) {
    const driver = await this.driverRepository.create(dto);

    return driver;
  }

  async getDriverByValue(id: number) {
    const driver = this.driverRepository.findOne({ where: { id } });

    return driver;
  }

  async getDriversListByValue(ids: number[]) {
    const driver = this.driverRepository.findAll({ where: { id: ids } });

    return driver;
  }

  async getAllDrivers(options) {
    const queryParams: FindOptions<Driver> = {
      include: { all: true }, // all - показать все поля.
      order: [['name', 'ASC']],
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

    return drivers;
  }
}
