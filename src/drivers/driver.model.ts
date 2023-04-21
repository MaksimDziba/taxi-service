import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

import { Vehicle } from 'src/vehicles/vehicle.model';
import { Shift } from 'src/shifts/shift.model';
import { DriverVehicles } from './driver-vehicle.model';
import { DriverShifts } from './driver-shifts.model';

interface DriverCreationsAttrs {
  id: number;
  name: string;
  passport: string;
  address: string;
  phone: string;
  driverLicense: string;
  contractNumber: number;
  paymentMethod: string;
  transportationAnimals: boolean;
}

@Table({ tableName: 'drivers' })
export class Driver extends Model<Driver, DriverCreationsAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Иванов Иван Иванович', description: 'ФИО' })
  @Column({ type: DataType.STRING, allowNull: true })
  name: string;

  @ApiProperty({ example: '12 34 567890', description: 'паспорт' })
  @Column({ type: DataType.STRING, allowNull: true })
  passport: string;

  @ApiProperty({ example: 'г.Иванов, ул.Ленина', description: 'адрес' })
  @Column({ type: DataType.STRING, allowNull: true })
  address: string;

  @ApiProperty({ example: '89159874321', description: 'номер телефона' })
  @Column({ type: DataType.STRING, allowNull: true })
  phone: string;

  @ApiProperty({
    example: '37 ВА 567890',
    description: 'водительское удостоверение',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  driverLicense: string;

  @ApiProperty({ example: '2022/123456789', description: 'номер договора' })
  @Column({ type: DataType.STRING, allowNull: true })
  contractNumber: string;

  @ApiProperty({
    example: 'телефон/терминал/наличными',
    description: 'метод оплаты',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  paymentMethod: string;

  @ApiProperty({
    example: 'true',
    description: 'перевозка домашних животных',
  })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  transportationAnimals: boolean;

  @BelongsToMany(() => Shift, () => DriverShifts)
  shifts: Shift[];

  @BelongsToMany(() => Vehicle, () => DriverVehicles)
  vehicles: Vehicle[];

  shift: Shift;
}
