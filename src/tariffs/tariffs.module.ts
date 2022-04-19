import { Module } from '@nestjs/common';
import { TariffsService } from './tariffs.service';

@Module({
  providers: [TariffsService],
})
export class TariffsModule {}
