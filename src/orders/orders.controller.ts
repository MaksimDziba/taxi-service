import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from './order.model';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDto } from './dto/order.dto';

@ApiTags('Смены')
@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @ApiOperation({ summary: 'Добавление смены' })
  @ApiResponse({ status: 200, type: Order })
  @Post()
  create(@Body() orderDto: CreateOrderDto) {
    return this.orderService.createOrder(orderDto);
  }

  @ApiOperation({ summary: 'Обновление транспортного средства' })
  @ApiResponse({ status: 200, type: Order })
  @Put('/:id')
  update(@Param('id') orderID: number, @Body() orderDto: OrderDto) {
    return this.orderService.updateOrder(orderID, orderDto);
  }

  @ApiOperation({ summary: 'Получить водителя по ИД ' })
  @ApiResponse({ status: 200, type: Order })
  @Get('/:id')
  getVehicleByValue(@Param('id') orderID: number) {
    return this.orderService.getOrderByValue(orderID);
  }

  @ApiOperation({ summary: 'Получение всех водителей' })
  @ApiResponse({ status: 200, type: [Order] })
  @Get()
  getAllOrders() {
    return this.orderService.getAllOrders();
  }
}
