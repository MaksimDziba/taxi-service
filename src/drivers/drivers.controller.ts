import { Body, Controller, Get, Post } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/create-driver.dto';

@Controller('drivers')
export class DriversController {
  constructor(private driverService: DriversService) {}

  @Post()
  create(@Body() driverDto: CreateDriverDto) {
    return this.driverService.createDriver(driverDto);
  }

  @Get()
  getAllDrivers() {
    return this.driverService.getAllDrivers();
  }
}
