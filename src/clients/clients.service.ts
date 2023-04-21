import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { FindOptions } from 'sequelize/types';

import { Client } from './client.model';
import { ClientDto } from './dto/client.dto';
import { CreateClientDto } from './dto/create-client.dto';

import { Order } from '../orders/order.model';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client)
    private clientRepository: typeof Client,
  ) {}

  async createClient(dto: CreateClientDto) {
    try {
      const client = await this.clientRepository.create(dto);

      return client;
    } catch (error) {
      console.log('🚀 ~ ClientsService ~ createClient ~ error', error);

      throw new HttpException(
        'При регистрации клиента произошла ошибка',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateClient(clientID: number, clientDto: ClientDto) {
    try {
      const client = await this.clientRepository.update(clientDto, {
        where: { id: clientID },
      });

      return client;
    } catch (error) {
      console.log('🚀 ~ ClientsService ~ updateClient ~ error', error);

      throw new HttpException(
        'При обновлении клиента произошла ошибка',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getClientByValue(id: number) {
    try {
      const client = await this.clientRepository.findOne({ where: { id } });

      return client;
    } catch (error) {
      console.log('🚀 ~ ClientsService ~ getClientByValue ~ error', error);

      throw new HttpException(
        'При получении клиента произошла ошибка',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getClientsListByValue(ids: number[]) {
    try {
      const clients = await this.clientRepository.findAll({
        where: { id: ids },
      });

      return clients;
    } catch (error) {
      console.log('🚀 ~ ClientsService ~ getClientsListByValue ~ error', error);

      throw new HttpException(
        'При получении списка клиентов по ИД произошла ошибка',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getClientByPhone(phone: string) {
    try {
      const queryParams: FindOptions<Client> = {
        include: { all: true }, // all - показать все поля.
        where: {
          name: sequelize.where(
            sequelize.fn('LOWER', sequelize.col('phone')),
            'LIKE',
            '%' + phone + '%',
          ),
        },
      };

      const client = await this.clientRepository.findOne(queryParams);

      return client;
    } catch (error) {
      console.log('🚀 ~ ClientsService ~ getClientByPhone ~ error', error);

      throw new HttpException(
        'При получении клиента по телефону произошла ошибка',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getAllClients(options) {
    try {
      const queryParams: FindOptions<Client> = {
        include: { all: true }, // all - показать все поля.
        order: [['id', 'DESC']],
      };

      if ('search' in options) {
        queryParams.where = {
          name: sequelize.where(
            sequelize.fn('LOWER', sequelize.col('phone')),
            'LIKE',
            '%' + options.search + '%',
          ),
        };
      }

      const clients = await this.clientRepository.findAll(queryParams);

      return clients;
    } catch (error) {
      console.log('🚀 ~ ClientsService ~ getAllClients ~ error', error);

      throw new HttpException(
        'При получении списка клиентов произошла ошибка',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async removeClient(clientID: number) {
    try {
      const client = await this.clientRepository.destroy({
        where: { id: clientID },
      });

      return client;
    } catch (error) {
      console.log('🚀 ~ ClientsService ~ removeClient ~ error', error);

      throw new HttpException(
        'При удалении клиента произошла ошибка',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getClientOrders(clientId: number) {
    try {
      const client = await this.clientRepository.findByPk(clientId, {
        include: [Order],
      });

      const groupClientOrders = client.orders.reduce((acc, order) => {
        const { status } = order;

        if (!acc[status]) {
          acc[status] = [];
        }

        acc[status].push(order);

        return acc;
      }, {});

      return groupClientOrders;
    } catch (error) {
      console.log('🚀 ~ ClientsService ~ getClientOrders ~ error', error);

      throw new HttpException(
        'При получении заказов клиента произошла ошибка',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
