import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize/types';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { Tariff } from './tariff.model';

@Injectable()
export class TariffsService {
  constructor(@InjectModel(Tariff) private tariffRepository: typeof Tariff) {}

  async createTariff(dto: CreateTariffDto) {
    const tariff = await this.tariffRepository.create(dto);

    return tariff;
  }

  async updateTariff(tariffID, tariffDto) {
    const tariff = await this.tariffRepository.update(tariffDto, {
      where: { id: tariffID },
    });

    return tariff;
  }

  async getTariffByValue(tariffID) {
    const tariff = await this.tariffRepository.findOne({
      where: { id: tariffID },
    });

    return tariff;
  }

  async getAllTariffs() {
    const queryParams: FindOptions<Tariff> = {
      include: { all: true }, // all - показать все поля.
      order: [['id', 'DESC']],
    };

    const tariffs = await this.tariffRepository.findAll(queryParams);

    return tariffs;
  }
}