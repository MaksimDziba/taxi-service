import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Driver } from './drivers/driver.model';
import { DriversModule } from './drivers/drivers.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { Vehicle } from './vehicles/vehicle.model';
import { DriverVehicles } from './drivers/driver-vehicle.model';
import { DriverShifts } from './drivers/driver-shifts.model';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Role } from './roles/roles.model';
import { RolesModule } from './roles/roles.module';
import { UserRoles } from './roles/user-roles.model';
import { OrdersModule } from './orders/orders.module';
import { ShiftOrders } from './orders/shift-orders.model';
import { ClientsController } from './clients/clients.controller';
import { ClientsModule } from './clients/clients.module';
import { TariffsController } from './tariffs/tariffs.controller';
import { TariffsModule } from './tariffs/tariffs.module';
import { ShiftsModule } from './shifts/shifts.module';
import { Order } from './orders/order.model';
import { Client } from './clients/client.model';
import { Tariff } from './tariffs/tariff.model';
import { Shift } from './shifts/shift.model';
import { GeoModule } from './services/geo/geo.module';

@Module({
  controllers: [ClientsController, TariffsController],
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
      models: [
        Driver,
        Vehicle,
        DriverVehicles,
        DriverShifts,
        User,
        Role,
        UserRoles,
        Order,
        Client,
        Tariff,
        Shift,
        ShiftOrders,
      ],
      autoLoadModels: true,
    }),
    DriversModule,
    VehiclesModule,
    AuthModule,
    UsersModule,
    RolesModule,
    OrdersModule,
    ClientsModule,
    TariffsModule,
    ShiftsModule,
    GeoModule
  ],
  providers: [],
})
export class AppModule {}
