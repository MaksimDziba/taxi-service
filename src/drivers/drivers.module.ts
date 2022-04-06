import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Driver } from './driver.model';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';

@Module({
  controllers: [DriversController],
  providers: [DriversService],
  imports: [SequelizeModule.forFeature([Driver])],
})
export class DriversModule {}
