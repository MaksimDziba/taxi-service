import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './order.model';
import { Client } from 'src/clients/client.model';
import { Tariff } from 'src/tariffs/tariff.model';

@Module({
  providers: [OrdersService],
  controllers: [OrdersController],
  imports: [SequelizeModule.forFeature([Order, Tariff, Client])],
  exports: [OrdersService],
})
export class OrdersModule {}
