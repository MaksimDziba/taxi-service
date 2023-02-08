import { Module } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { ShiftsController } from './shifts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Shift } from './shift.model';
import { DriversModule } from 'src/drivers/drivers.module';
import { VehiclesModule } from 'src/vehicles/vehicles.module';
import { OrdersModule } from 'src/orders/orders.module';
import { DriverShifts } from 'src/drivers/driver-shifts.model';

import { ShiftOrders } from 'src/orders/shift-orders.model';
import { Order } from 'src/orders/order.model';

@Module({
  providers: [ShiftsService],
  controllers: [ShiftsController],
  imports: [
    SequelizeModule.forFeature([Shift, Order, ShiftOrders, DriverShifts]),
    DriversModule,
    VehiclesModule,
    OrdersModule,
  ],
  exports: [ShiftsService],
})
export class ShiftsModule {}
