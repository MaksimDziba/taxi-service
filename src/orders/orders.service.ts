import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize';
import { ClientsService } from 'src/clients/clients.service';
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
    const { clientID, tariffID } = dto;

    let client = { id: clientID };

    const findClient = await this.clientService.getClientByValue(clientID);

    if (!findClient && typeof clientID === 'string') {
      client = await this.clientService.createClient({
        name: clientID,
        phone: clientID,
      });
    } else {
      client = await this.clientService.getClientByValue(clientID);
    }

    const order = await this.orderRepository.create({
      ...dto,
      clientID: client.id,
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
      include: { all: true }, // all - показать все поля.
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
