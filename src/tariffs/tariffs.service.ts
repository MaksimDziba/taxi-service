import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FindOptions } from 'sequelize/types';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { TariffDto } from './dto/tariff.dto';
import { Tariff } from './tariff.model';

@Injectable()
export class TariffsService {
  constructor(@InjectModel(Tariff) private tariffRepository: typeof Tariff) {}

  async createTariff(dto: CreateTariffDto) {
    const tariff = await this.tariffRepository.create(dto);

    return tariff;
  }

  async updateTariff(tariffID: number, tariffDto: TariffDto) {
    const tariff = await this.tariffRepository.update(tariffDto, {
      where: { id: tariffID },
    });

    return tariff;
  }

  async removeTariff(tariffID: number) {
    const tariff = await this.tariffRepository.destroy({
      where: { id: tariffID },
    });

    return tariff;
  }

  async getTariffByValue(tariffID: number) {
    const tariff = await this.tariffRepository.findOne({
      where: { id: tariffID },
    });

    return tariff;
  }

  async getAllTariffs() {
    const queryParams: FindOptions<Tariff> = {
      order: [['id', 'DESC']],
    };

    const tariffs = await this.tariffRepository.findAll(queryParams);

    return tariffs;
  }
}
