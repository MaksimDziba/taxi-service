import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Driver } from './driver.model';
import { DriverVehicles } from './driver-vehicle.model';
import { DriverShifts } from './driver-shifts.model';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';
import { Vehicle } from 'src/vehicles/vehicle.model';

@Module({
  providers: [DriversService],
  controllers: [DriversController],
  imports: [SequelizeModule.forFeature([Driver, Vehicle, DriverVehicles, DriverShifts])],
  exports: [DriversService],
})
export class DriversModule {}
