import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Driver } from './drivers/driver.model';
import { VehiclesService } from './vehicles/vehicles.service';
import { VehiclesModule } from './vehicles/vehicles.module';
import { Vehicle } from './vehicles/vehicle.model';
import { DriverVehicles } from './drivers/driver-vehicle.model';

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Driver, Vehicle, DriverVehicles],
      autoLoadModels: true,
    }),
    VehiclesModule,
  ],
  providers: [VehiclesService],
})
export class AppModule {}
