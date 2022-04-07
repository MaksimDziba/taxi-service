import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicle } from './vehicle.model';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectModel(Vehicle) private vehicleRepository: typeof Vehicle,
  ) {}

  async createVehicle(dto: CreateVehicleDto) {
    const vehicle = await this.vehicleRepository.create(dto);

    return vehicle;
  }

  async getVehicleByValue(id: number) {
    const vehicle = this.vehicleRepository.findOne({ where: { id } });

    return vehicle;
  }

  async getAllVehicles() {
    const vehicles = await this.vehicleRepository.findAll();

    return vehicles;
  }
}
