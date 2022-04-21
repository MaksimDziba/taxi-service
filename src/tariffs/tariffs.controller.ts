import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { TariffDto } from './dto/tariff.dto';
import { Tariff } from './tariff.model';
import { TariffsService } from './tariffs.service';

@ApiTags('Тарифы')
@Controller('tariffs')
export class TariffsController {
  constructor(private tariffService: TariffsService) {}

  @ApiOperation({ summary: 'Добавление тарифа' })
  @ApiResponse({ status: 200, type: Tariff })
  @Post()
  create(@Body() tariffDto: CreateTariffDto) {
    return this.tariffService.createTariff(tariffDto);
  }

  @ApiOperation({ summary: 'Обновление данных тарифа' })
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

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tariffService.removeTariff(id);
  }
}
