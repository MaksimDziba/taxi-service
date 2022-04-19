import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDto } from './dto/order.dto';
import { Order } from './order.model';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order) private orderRepository: typeof Order) {}

  async createOrder(dto: CreateOrderDto) {
    const order = await this.orderRepository.create(dto);

    return order;
  }

  async updateOrder(orderID: number, orderDto: OrderDto) {
    const order = await this.orderRepository.update(orderDto, {
      where: { id: orderID },
    });

    return order;
  }

  async getOrderByValue(id: number) {
    const order = this.orderRepository.findOne({ where: { id } });

    return order;
  }

  async getOrdersListByValue(ids: number[]) {
    const order = this.orderRepository.findAll({ where: { id: ids } });

    return order;
  }

  async getAllOrders() {
    const queryParams: FindOptions<Order> = {
      include: { all: true }, // all - показать все поля.
      order: [['id', 'DESC']],
    };

    const orders = await this.orderRepository.findAll(queryParams);

    return orders;
  }
}
