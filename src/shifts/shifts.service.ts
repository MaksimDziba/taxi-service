import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Shift } from './shift.model';
import { CreateShiftDto } from './dto/create-shift.dto';
import { DriversService } from 'src/drivers/drivers.service';
import { ShiftDto } from './dto/shift.dto';

@Injectable()
export class ShiftsService {
  constructor(
    @InjectModel(Shift) private shiftRepository: typeof Shift,
    private driverService: DriversService,
  ) {}

  async createShift(dto: CreateShiftDto) {
    const shift = await this.shiftRepository.create(dto);

    const findDriver = await this.driverService.getDriverByValue(dto.driverID);

    shift.driver = findDriver;

    await shift.$set('driver', findDriver);

    return shift;
  }

  async getShiftByValue(id: number) {
    const shift = this.shiftRepository.findOne({ where: { id } });

    if (shift) {
      return shift;
    }

    throw new HttpException('Смена не найдена', HttpStatus.NOT_FOUND);
  }

  async updateShift(shiftID: number, shiftDto: ShiftDto) {
    const shift = await this.shiftRepository.update(shiftDto, {
      where: { id: shiftID },
    });

    return shift;
  }
}
