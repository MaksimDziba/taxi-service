import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { FindOptions } from 'sequelize/types';
import { Client } from './client.model';
import { ClientDto } from './dto/client.dto';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientsService {
  constructor(@InjectModel(Client) private clientRepository: typeof Client) {}

  async createClient(dto: CreateClientDto) {
    const client = await this.clientRepository.create(dto);

    return client;
  }

  async updateClient(clientID: number, clientDto: ClientDto) {
    const client = await this.clientRepository.update(clientDto, {
      where: { id: clientID },
    });

    return client;
  }

  async getClientByValue(id: number) {
    const client = this.clientRepository.findOne({ where: { id } });

    return client;
  }

  async getClientsListByValue(ids: number[]) {
    const client = this.clientRepository.findAll({ where: { id: ids } });

    return client;
  }

  async getAllClients(options) {
    const queryParams: FindOptions<Client> = {
      include: { all: true }, // all - показать все поля.
      order: [['id', 'DESC']],
    };

    if ('search' in options) {
      queryParams.where = {
        name: sequelize.where(
          sequelize.fn('LOWER', sequelize.col('name')),
          'LIKE',
          '%' + options.search + '%',
        ),
      };
    }

    const clients = await this.clientRepository.findAll(queryParams);

    return clients;
  }
}
