import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Driver } from 'src/drivers/driver.model';
import { DriverVehicles } from 'src/drivers/driver-vehicle.model';
import { Vehicle } from './vehicle.model';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';

@Module({
  controllers: [VehiclesController],
  providers: [VehiclesService],
  imports: [SequelizeModule.forFeature([Vehicle, Driver, DriverVehicles])],
})
export class VehiclesModule {}
