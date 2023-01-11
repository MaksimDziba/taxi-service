import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindOptions } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';

import { Order } from './order.model';
import { Tariff } from 'src/tariffs/tariff.model';
import { Client } from 'src/clients/client.model';
import { ClientsService } from 'src/clients/clients.service';
import { GeoService } from 'src/services/geo/geo.service';

import { OrderDto } from './dto/order.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order) private orderRepository: typeof Order,
    private clientService: ClientsService,
    private geoService: GeoService,
  ) {}

  async createOrder(dto: CreateOrderDto) {
    const { client, clientID, tariffID, addressFrom, addressTo } = dto;

    const location = await this.geoService.getGeolocationOrder(addressFrom, addressTo);

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
      location: JSON.stringify(location),
    });

    return order;
  }

  async updateOrder(orderID: number, orderDto: OrderDto) {
    const order = await this.orderRepository.update(orderDto, {
      where: { id: orderID },
    });

    if (order) {
      return order;

    }
  
    throw new HttpException('Заказ не найден', HttpStatus.NOT_FOUND);
  }

  // Надо придумать как брать заказы водителю

  async getOrderByValue(id: number) {
    const order = this.orderRepository.findOne({ where: { id } });

    if (order) {
      return order;

    }
  
    throw new HttpException('Заказ не найден', HttpStatus.NOT_FOUND);
  }

  async getOrdersListByValue(ids: number[]) {
    const order = this.orderRepository.findAll({ where: { id: ids } });

    if (order) {
      return order;

    }
  
    throw new HttpException('Заказ не найден', HttpStatus.NOT_FOUND);
  }

  async getAllOrders() {
    const queryParams: FindOptions<Order> = {
      include: [Client, Tariff], // all - показать все поля.
      order: [['id', 'DESC']],
    };

    const orders = await this.orderRepository.findAll(queryParams);

    if (orders) {
      return orders;      
    }

    throw new HttpException('Заказы не найдены', HttpStatus.NOT_FOUND);
  }

  async removeOrder(orderID: number) {
    const order = await this.orderRepository.destroy({
      where: { id: orderID },
    });

    if (order) {
      return order;

    }
  
    throw new HttpException('Заказ не найден', HttpStatus.NOT_FOUND);
  }
}
