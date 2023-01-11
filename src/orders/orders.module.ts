import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './order.model';
import { Tariff } from 'src/tariffs/tariff.model';
import { Client } from 'src/clients/client.model';
import { ClientsModule } from 'src/clients/clients.module';
import { ShiftOrders } from './shift-orders.model';
import { Shift } from 'src/shifts/shift.model';
import { GeoModule } from 'src/services/geo/geo.module';

@Module({
  providers: [OrdersService],
  controllers: [OrdersController],
  imports: [
    SequelizeModule.forFeature([Order, Tariff, Client]),
    SequelizeModule.forFeature([Shift, Order, ShiftOrders]),
    ClientsModule,
    GeoModule,
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
