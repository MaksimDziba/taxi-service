import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { Shift } from 'src/shifts/shift.model';
import { Client } from 'src/clients/client.model';
import { Tariff } from 'src/tariffs/tariff.model';
import { ShiftOrders } from './shift-orders.model';

interface OrderCreationsAttrs {
  id: number;
  addressFrom: string;
  addressTo: string;
  location: string;
  status: string;
  timeOrder: Date;
  maxCountPassenger: number;
  preOrderCost: number;
  operatorName: string;
  clientID: number;
  tariffID: number;
}

@Table({ tableName: 'orders' })
export class Order extends Model<Order, OrderCreationsAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'г.Иванов, ул.Ленина, д.3, кв. 43',
    description: 'Откуда поедите?',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  addressFrom: string;

  @ApiProperty({
    example: 'г.Иванов, ул.Ленина, д.3, кв. 43',
    description: 'Куда поедите?',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  addressTo: string;

  @ApiProperty({
    example: `{
      from: { lat: '', lon: '' },
      to: { lat: '', lon: '' }
    }`,
    description: 'Геолокация для построения маршрута заказа. Получаем при создании заказа.',
  })
  @Column({ type: DataType.JSON })
  location: string;

  @ApiProperty({
    example: 'pending - accepted - process - finished',
    description: 'статус заказа',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  status: string;

  @ApiProperty({ example: '15:30', description: 'Время заказа' })
  @Column({ type: DataType.TIME, defaultValue: 'NOW()' })
  timeOrder: Date;

  @ApiProperty({ example: '3', description: 'Макс. кол-во пассажиров' })
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  maxCountPassenger: number;

  @ApiProperty({ example: '250', description: 'Предварительная сто-ть заказа' })
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  preOrderCost: number;

  @ApiProperty({
    example: 'true',
    description: 'перевозка домашних животных',
  })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  transportationAnimals: boolean;

  @ApiProperty({ example: 'true', description: 'детское кресло' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  babyChair: boolean;

  @ApiProperty({
    example: 'Иванов Иван Иванович',
    description: 'ФИО оператора',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  operatorName: string;

  @BelongsTo(() => Tariff)
  tariff: Tariff;

  @ForeignKey(() => Tariff)
  @Column({ type: DataType.INTEGER, allowNull: false })
  tariffID: number;

  @BelongsTo(() => Client)
  client: Client;

  @ForeignKey(() => Client)
  @Column({ type: DataType.INTEGER, allowNull: false })
  clientID: number;

  @BelongsToMany(() => Shift, () => ShiftOrders)
  shift: Shift;
}
