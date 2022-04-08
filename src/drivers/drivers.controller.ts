import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Driver } from './driver.model';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';

@ApiTags('Водители')
@Controller('drivers')
export class DriversController {
  constructor(private driverService: DriversService) {}

  @ApiOperation({ summary: 'Добавление водителя' })
  @ApiResponse({ status: 200, type: Driver })
  @Post()
  create(@Body() driverDto: CreateDriverDto, vehicleID: number) {
    return this.driverService.createDriver(driverDto, vehicleID);
  }

  @ApiOperation({ summary: 'Получение всех водителей' })
  @ApiResponse({ status: 200, type: [Driver] })
  @Get()
  getAllDrivers() {
    return this.driverService.getAllDrivers();
  }
}
