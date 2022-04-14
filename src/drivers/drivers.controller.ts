import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
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
  create(@Body() driverDto: CreateDriverDto) {
    return this.driverService.createDriver(driverDto);
  }

  @ApiOperation({ summary: 'Получить водителя по ИД ' })
  @ApiResponse({ status: 200, type: Driver })
  @Get('/:id')
  getVehicleByValue(@Param('id') driverID: number) {
    return this.driverService.getDriverByValue(driverID);
  }

  @ApiOperation({ summary: 'Получение всех водителей' })
  @ApiResponse({ status: 200, type: [Driver] })
  @Get()
  getAllDrivers(@Query() options) {
    return this.driverService.getAllDrivers(options);
  }
}
