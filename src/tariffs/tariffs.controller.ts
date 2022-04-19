import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { TariffDto } from './dto/tariff.dto';
import { Tariff } from './tariff.model';
import { TariffsService } from './tariffs.service';

@Controller('tariffs')
export class TariffsController {
  constructor(private tariffService: TariffsService) {}

  @ApiOperation({ summary: 'Добавление тарифа' })
  @ApiResponse({ status: 200, type: Tariff })
  @Post()
  create(@Body() tariffDto: CreateTariffDto) {
    return this.tariffService.createTariff(tariffDto);
  }

  @ApiOperation({ summary: 'Добавление обновление тарифа' })
  @ApiResponse({ status: 200, type: Tariff })
  @Put('/:id')
  update(@Param('id') tariffID: number, @Body() tariffDto: TariffDto) {
    return this.tariffService.updateTariff(tariffID, tariffDto);
  }

  @ApiOperation({ summary: 'Получить тариф по ИД ' })
  @ApiResponse({ status: 200, type: Tariff })
  @Get('/:id')
  getVehicleByValue(@Param('id') tariffID: number) {
    return this.tariffService.getTariffByValue(tariffID);
  }

  @ApiOperation({ summary: 'Получить все тарифы' })
  @ApiResponse({ status: 200, type: [Tariff] })
  @Get()
  getAllDrivers() {
    return this.tariffService.getAllTariffs();
  }
}

// import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
// import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { Driver } from './driver.model';
// import { DriversService } from './drivers.service';
// import { CreateDriverDto } from './dto/create-driver.dto';
// import { DriverDto } from './dto/driver.dto';
// import { TariffsService } from './tariffs.service';

// @ApiTags('Водители')
// @Controller('drivers')
// export class DriversController {
//   constructor(private driverService: DriversService) {}

//   @ApiOperation({ summary: 'Добавление водителя' })
//   @ApiResponse({ status: 200, type: Driver })
//   @Post()
//   create(@Body() driverDto: CreateDriverDto) {
//     return this.driverService.createDriver(driverDto);
//   }

//   @ApiOperation({ summary: 'Добавление транспортного средства' })
//   @ApiResponse({ status: 200, type: Driver })
//   @Put('/:id')
//   update(@Param('id') driverID: number, @Body() driverDto: DriverDto) {
//     return this.driverService.updateDriver(driverID, driverDto);
//   }

//   @ApiOperation({ summary: 'Получить водителя по ИД ' })
//   @ApiResponse({ status: 200, type: Driver })
//   @Get('/:id')
//   getVehicleByValue(@Param('id') driverID: number) {
//     return this.driverService.getDriverByValue(driverID);
//   }

//   @ApiOperation({ summary: 'Получение всех водителей' })
//   @ApiResponse({ status: 200, type: [Driver] })
//   @Get()
//   getAllDrivers(@Query() options) {
//     return this.driverService.getAllDrivers(options);
//   }
// }
