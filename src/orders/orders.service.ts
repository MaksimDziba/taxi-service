import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { Client } from 'src/clients/client.model';
import { ClientsService } from 'src/clients/clients.service';
import { Shift } from 'src/shifts/shift.model';
import { Tariff } from 'src/tariffs/tariff.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDto } from './dto/order.dto';
import { Order } from './order.model';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private orderRepository: typeof Order,
    private clientService: ClientsService,
  ) {}

  async createOrder(dto: CreateOrderDto) {
    const { client, clientID, tariffID } = dto;
    let _clientID = clientID;

    if (!_clientID) {
      const newClient = await this.clientService.createClient({
        name: client.phone,
        phone: client.phone,
      });

      _clientID = newClient.id;
    }

    const order = await this.orderRepository.create({
      ...dto,
      clientID: _clientID,
      tariffID,
    });

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
      include: [Client, Tariff], // all - показать все поля.
      order: [['id', 'DESC']],
    };

    const orders = await this.orderRepository.findAll(queryParams);

    return orders;
  }

  async removeOrder(tariffID: number) {
    const tariff = await this.orderRepository.destroy({
      where: { id: tariffID },
    });

    return tariff;
  }
}
