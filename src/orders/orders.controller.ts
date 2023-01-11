import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Order } from './order.model';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDto } from './dto/order.dto';

@ApiTags('Заказы')
@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @ApiOperation({ summary: 'Создание заказа' })
  @ApiResponse({ status: 200, type: Order })
  @Post()
  create(@Body() orderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(orderDto);
  }

  @ApiOperation({ summary: 'Обновление данных о заказе' })
  @ApiResponse({ status: 200, type: Order })
  @Put('/:id')
  update(@Param('id') orderID: number, @Body() orderDto: OrderDto) {
    return this.orderService.updateOrder(orderID, orderDto);
  }

  @ApiOperation({ summary: 'Получить заказ по ИД ' })
  @ApiResponse({ status: 200, type: Order })
  @Get('/:id')
  getVehicleByValue(@Param('id') orderID: number) {
    return this.orderService.getOrderByValue(orderID);
  }

  @ApiOperation({ summary: 'Получение всех заказов' })
  @ApiResponse({ status: 200, type: [Order] })
  @Get()
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.orderService.removeOrder(id);
  }
}
