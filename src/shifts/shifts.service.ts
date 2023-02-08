import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';

import { DriversService } from '../drivers/drivers.service';
import { OrdersService } from 'src/orders/orders.service';

import { Shift } from './shift.model';

import { CreateShiftDto } from './dto/create-shift.dto';

@Injectable()
export class ShiftsService {
  constructor(
    @InjectModel(Shift) 
    private shiftRepository: typeof Shift,
    private driverService: DriversService,
    private orderService: OrdersService,
  ) {}

  async createShift(data: CreateShiftDto) {
    try {
      const shift = await this.shiftRepository.create({
        ...data,
        startTime: new Date(),
        priority: 4,
      });

      const driver = await this.driverService.getDriverByValue(
        data.driverID,
      );

      await shift.$set('driver', driver);

      return shift;
    } catch (error) {
      console.log('🚀 ~ ShiftsService ~ createShift ~ error', error);
      
      throw new HttpException('Не удалось взять смену', HttpStatus.NOT_FOUND);
    }
  }

  async getShiftByValue(id: number) {
    try {
      const shift = await this.shiftRepository.findOne({ where: { id } });
  
      return shift;
    } catch (error) {
      console.log('🚀 ~ ShiftsService ~ getShiftByValue ~ error', error);
      
      throw new HttpException('Смена не найдена', HttpStatus.NOT_FOUND);
    }
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
        order: [['startTime', 'DESC']],
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
    } catch(error) {
      console.log('🚀 ~ ShiftsService ~ getAllShifts ~ error', error);

      throw new HttpException(
        'Не удалось получить смены',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async finishedShift(id: number) {
    try {
      const shift = await this.shiftRepository.findOne({ where: { id } });
      console.log('🚀 ~ ShiftsService ~ finishedShift ~ shift', shift);

      if (shift) {
        await this.shiftRepository.update(
          { 
            endTime: new Date(), 
            status: 'finished' 
          },
          {
            where: { id: shift.id },
          },
        );
      }
    } catch(error) {
      console.log('🚀 ~ ShiftsService ~ finishedShift ~ error', error);

      throw new HttpException(
        'Не удалось завершить смену',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async assignOrderToShift(orderID: number, shiftID: number): Promise<void> {
    try {
      const order = await this.orderService.getOrderByValue(orderID);
  
      const shift = await this.getShiftByValue(shiftID);
  
      await shift.$add('orders', order);
    } catch (error) {
      console.log('🚀 ~ ShiftsService ~ assignOrderToShift ~ error', error);

      throw new HttpException(
        'Не удалось связать смену и заказ',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
