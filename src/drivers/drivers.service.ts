import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VehiclesService } from 'src/vehicles/vehicles.service';
import { Driver } from './driver.model';
import { CreateDriverDto } from './dto/create-driver.dto';

@Injectable()
export class DriversService {
  constructor(
    @InjectModel(Driver) private driverRepository: typeof Driver,
    private vehiclesService: VehiclesService,
  ) {}

  async createDriver(dto: CreateDriverDto, vehicleID: number) {
    const driver = await this.driverRepository.create(dto);

    // при создании добавить ид транспортного средства
    const vehicle = await this.vehiclesService.getVehicleByValue(vehicleID);
    await driver.$set('vehicles', [vehicle.id]);

    return driver;
  }

  async getAllDrivers() {
    // all - показать все поля.
    const drivers = await this.driverRepository.findAll({
      include: { all: true },
    });

    return drivers;
  }
}
