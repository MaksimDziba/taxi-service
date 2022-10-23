import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Shift } from './shift.model';
import { CreateShiftDto } from './dto/create-shift.dto';
import { DriversService } from '../drivers/drivers.service';
import { VehiclesService } from '../vehicles/vehicles.service';
import { ShiftDto } from './dto/shift.dto';
import sequelize from 'sequelize';

@Injectable()
export class ShiftsService {
  constructor(
    @InjectModel(Shift) private shiftRepository: typeof Shift,
    private driverService: DriversService,
    private vehiclesService: VehiclesService,
  ) {}

  async createShift(dto: CreateShiftDto) {
    try {
      const shift = await this.shiftRepository.create(dto);

      const findDriver = await this.driverService.getDriverByValue(
        dto.driverID,
      );

      // const findVehicle = await this.vehiclesService.getVehicleByValue(
      //   dto.vehicleID,
      // );

      shift.driverID = findDriver.id;
      // shift.vehicleID = findVehicle.id;

      await shift.$set('driverID', findDriver.id);
      // await shift.$set('vehicleID', findVehicle.id);

      return shift;
    } catch (error) {
      throw new HttpException('Не удалось взять смену', HttpStatus.NOT_FOUND);
    }
  }

  async getShiftByValue(id: number) {
    const shift = this.shiftRepository.findOne({ where: { id } });

    if (shift) {
      return shift;
    }

    throw new HttpException('Смена не найдена', HttpStatus.NOT_FOUND);
  }

  async getAllShifts() {
    try {
      const shiftsWorking = await this.shiftRepository.findOne({
        where: {
          status: sequelize.where(
            sequelize.fn('LOWER', sequelize.col('status')),
            'LIKE',
            '%' + 'working' + '%',
          ),
        },
      });

      const shiftsFinished = await this.shiftRepository.findAll({
        where: {
          status: sequelize.where(
            sequelize.fn('LOWER', sequelize.col('status')),
            'LIKE',
            '%' + 'finished' + '%',
          ),
        },
      });

      return {
        working: shiftsWorking,
        finished: shiftsFinished,
      };
    } catch {
      throw new HttpException(
        'Не удалось получить смены',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async finishedShift() {
    try {
      const shiftsWorking = await this.shiftRepository.findOne({
        where: {
          status: sequelize.where(
            sequelize.fn('LOWER', sequelize.col('status')),
            'LIKE',
            '%' + 'working' + '%',
          ),
        },
      });

      if (shiftsWorking) {
        await this.shiftRepository.update(
          { endTime: new Date(), status: 'finished' },
          {
            where: { id: shiftsWorking.id },
          },
        );

        return shiftsWorking;
      }
    } catch {
      throw new HttpException(
        'Не удалось завершить смену',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // async updateShift(shiftID: number, shiftDto: ShiftDto) {
  //   const shift = await this.shiftRepository.update(shiftDto, {
  //     where: { id: shiftID },
  //   });

  //   return shift;
  // }
}
