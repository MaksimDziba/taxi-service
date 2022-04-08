import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Driver } from 'src/drivers/driver.model';
import { DriverVehicles } from 'src/drivers/driver-vehicle.model';
import { Vehicle } from './vehicle.model';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';

@Module({
  providers: [VehiclesService],
  controllers: [VehiclesController],
  imports: [SequelizeModule.forFeature([Vehicle, Driver, DriverVehicles])],
  exports: [VehiclesService],
})
export class VehiclesModule {}
