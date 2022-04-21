import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { VehicleDto } from './dto/vehicle.dto';
import { Vehicle } from './vehicle.model';
import { VehiclesService } from './vehicles.service';

@ApiTags('Транспортные средства')
@Controller('vehicles')
export class VehiclesController {
  constructor(private vehiclesService: VehiclesService) {}

  @ApiOperation({ summary: 'Добавление транспортного средства' })
  @ApiResponse({ status: 200, type: Vehicle })
  @Post()
  create(@Body() vehicleDto: CreateVehicleDto, drivers: number[]) {
    return this.vehiclesService.createVehicle(vehicleDto, drivers);
  }

  @ApiOperation({ summary: 'Добавление транспортного средства' })
  @ApiResponse({ status: 200, type: Vehicle })
  @Put('/:id')
  update(@Param('id') vehicleID: number, @Body() vehicleDto: VehicleDto) {
    return this.vehiclesService.updateVehicle(vehicleID, vehicleDto);
  }

  @ApiOperation({ summary: 'Получить транспортное средство по ИД ' })
  @ApiResponse({ status: 200, type: Vehicle })
  @Get('/:id')
  getVehicleByValue(@Param('id') vehicleID: number) {
    return this.vehiclesService.getVehicleByValue(vehicleID);
  }

  @ApiOperation({ summary: 'Получение всех транспортных средств' })
  @ApiResponse({ status: 200, type: [Vehicle] })
  @Get()
  getAllVehicles() {
    return this.vehiclesService.getAllVehicles();
  }
}
