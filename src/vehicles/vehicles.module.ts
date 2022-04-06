import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vehicle } from './vehicle.model';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';

@Module({
  controllers: [VehiclesController],
  providers: [VehiclesService],
  imports: [SequelizeModule.forFeature([Vehicle])],
})
export class VehiclesModule {}
