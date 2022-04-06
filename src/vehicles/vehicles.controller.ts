import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicle } from './vehicle.model';
import { VehiclesService } from './vehicles.service';

@Controller('vehicles')
export class VehiclesController {
  constructor(private vehiclesService: VehiclesService) {}

  @ApiOperation({ summary: 'Добавление транспортного средства' })
  @ApiResponse({ status: 200, type: Vehicle })
  @Post()
  create(@Body() vehicleDto: CreateVehicleDto) {
    return this.vehiclesService.createVehicle(vehicleDto);
  }

  @ApiOperation({ summary: 'Получение всех транспортных средств' })
  @ApiResponse({ status: 200, type: [Vehicle] })
  @Get()
  getAllVehicles() {
    return this.vehiclesService.getAllVehicles();
  }
}
