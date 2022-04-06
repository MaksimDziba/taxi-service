import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vehicle } from 'src/vehicles/vehicle.model';
import { DriverVehicles } from './driver-vehicle.model';
import { Driver } from './driver.model';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';

@Module({
  controllers: [DriversController],
  providers: [DriversService],
  imports: [SequelizeModule.forFeature([Driver, Vehicle, DriverVehicles])],
})
export class DriversModule {}
