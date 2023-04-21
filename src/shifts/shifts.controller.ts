import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateShiftDto } from './dto/create-shift.dto';
import { Shift } from './shift.model';
import { ShiftsService } from './shifts.service';

@ApiTags('Смена водителя')
@Controller('shifts')
export class ShiftsController {
  constructor(private shiftsService: ShiftsService) {}

  @ApiOperation({ summary: 'Связать заказ со сменой' })
  @ApiResponse({ status: 200, type: Shift })
  @Post('/assign-order-to-shift/')
  assignOrderToShift(
    @Body('orderID') orderID: number,
    @Body('shiftID') shiftID: number,
  ) {
    return this.shiftsService.assignOrderToShift(orderID, shiftID);
  }

  @ApiOperation({ summary: 'Создание смены' })
  @ApiResponse({ status: 200, type: Shift })
  @Post()
  create(@Body() shiftDto: CreateShiftDto) {
    return this.shiftsService.createShift(shiftDto);
  }

  @ApiOperation({ summary: 'Завершение смены' })
  @ApiResponse({ status: 200, type: Shift })
  @Put('/:id/finished')
  update(@Param('id') shiftID: number) {
    return this.shiftsService.finishedShift(shiftID);
  }

  @ApiOperation({ summary: 'Получить смену по ИД' })
  @ApiResponse({ status: 200, type: Shift })
  @Get('/:id')
  getShiftByValue(@Param('id') shiftID: number) {
    return this.shiftsService.getShiftByValue(shiftID);
  }

  @ApiOperation({ summary: 'Получение всех смен' })
  @ApiResponse({ status: 200, type: [Shift] })
  @Get()
  getAllShifts() {
    return this.shiftsService.getAllShifts();
  }
}
