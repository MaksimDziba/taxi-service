import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicle } from './vehicle.model';
import { DriversService } from '../drivers/drivers.service';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectModel(Vehicle) private vehicleRepository: typeof Vehicle,
    private driverService: DriversService,
  ) {}

  async createVehicle(dto: CreateVehicleDto, drivers: number[]) {
    const vehicle = await this.vehicleRepository.create(dto);

    // при создании добавить ид транспортного средства
    if (drivers?.length) {
      for (const driver of drivers) {
        const findDriver = await this.driverService.getDriverByValue(driver);

        await vehicle.$set('drivers', findDriver);
      }
    }

    return vehicle;
  }

  async getVehicleByValue(id: number) {
    const vehicle = await this.vehicleRepository.findOne({
      where: { id },
    });

    return vehicle;
  }

  async getVehicleListByID(ids: number[]) {
    const vehicle = await this.vehicleRepository.findAll({
      where: { id: ids },
    });

    return vehicle;
  }

  async getAllVehicles() {
    const vehicles = await this.vehicleRepository.findAll();

    return vehicles;
  }
}
