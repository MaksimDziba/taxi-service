import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateShiftDto } from './dto/create-shift.dto';
import { ShiftDto } from './dto/shift.dto';
import { Shift } from './shift.model';
import { ShiftsService } from './shifts.service';

@ApiTags('Смена водителя')
@Controller('shifts')
export class ShiftsController {
  constructor(private shiftsService: ShiftsService) {}

  @ApiOperation({ summary: 'Создание смены' })
  @ApiResponse({ status: 200, type: Shift })
  @Post()
  create(@Body() shiftDto: CreateShiftDto) {
    return this.shiftsService.createShift(shiftDto);
  }

  @ApiOperation({ summary: 'Завершение смены' })
  @ApiResponse({ status: 200, type: Shift })
  @Put('/finished')
  finishedShift() {
    return this.shiftsService.finishedShift();
  }

  @ApiOperation({ summary: 'Получить смену по ИД' })
  @ApiResponse({ status: 200, type: Shift })
  @Get('/:id')
  getShiftByValue(@Param('id') shiftID: number) {
    return this.shiftsService.getShiftByValue(shiftID);
  }

  @ApiOperation({ summary: 'Получение всех водителей' })
  @ApiResponse({ status: 200, type: [Shift] })
  @Get()
  getAllShifts() {
    return this.shiftsService.getAllShifts();
  }

  // @ApiOperation({ summary: 'Получить смену по ИД' })
  // @ApiResponse({ status: 200, type: Shift })
  // @Put('/:id')
  // update(@Param('id') shiftID: number, @Body() shiftDto: ShiftDto) {
  //   return this.shiftsService.updateShift(shiftID, shiftDto);
  // }
}
