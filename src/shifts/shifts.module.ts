import { Module } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { ShiftsController } from './shifts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Shift } from './shift.model';
import { Vehicle } from 'src/vehicles/vehicle.model';
import { Driver } from 'src/drivers/driver.model';
import { ShiftDriverVehicles } from './shift-driver-vehicle.model';
import { DriversModule } from 'src/drivers/drivers.module';

@Module({
  providers: [ShiftsService],
  controllers: [ShiftsController],
  imports: [
    SequelizeModule.forFeature([Shift, Vehicle, Driver, ShiftDriverVehicles]),
    DriversModule,
  ],
})
export class ShiftsModule {}
