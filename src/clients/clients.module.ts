import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Client } from './client.model';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';

@Module({
  providers: [ClientsService],
  controllers: [ClientsController],
  imports: [SequelizeModule.forFeature([Client])],
  exports: [ClientsService],
})
export class ClientsModule {}
