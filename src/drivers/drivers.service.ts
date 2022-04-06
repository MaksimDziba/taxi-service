import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Driver } from './driver.model';
import { CreateDriverDto } from './dto/create-driver.dto';

@Injectable()
export class DriversService {
  constructor(@InjectModel(Driver) private driverRepository: typeof Driver) {}

  async createDriver(dto: CreateDriverDto) {
    const driver = await this.driverRepository.create(dto);

    return driver;
  }

  async getAllDrivers() {
    const drivers = await this.driverRepository.findAll();

    return drivers;
  }
}
