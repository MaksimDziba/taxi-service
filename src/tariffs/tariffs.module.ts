import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tariff } from './tariff.model';
import { TariffsController } from './tariffs.controller';
import { TariffsService } from './tariffs.service';

@Module({
  providers: [TariffsService],
  controllers: [TariffsController],
  imports: [SequelizeModule.forFeature([Tariff])],
  exports: [TariffsService],
})
export class TariffsModule {}
