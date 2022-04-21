import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Client } from 'src/clients/client.model';
import { Tariff } from 'src/tariffs/tariff.model';

interface OrderCreationsAttrs {
  id: number;
  addressFrom: string;
  addressTo: string;
  timeOrder: Date;
  maxCountPassenger: number;
  preOrderCost: number;
  operatorName: string;
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

  @ApiProperty({ example: '10.10.2022 15:30 ', description: 'Время заказа' })
  @Column({ type: DataType.DATE, allowNull: true })
  timeOrder: Date;

  @ApiProperty({ example: '3', description: 'Макс. кол-во пассажиров' })
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  maxCountPassenger: number;

  @ApiProperty({ example: '250', description: 'Предварительная сто-ть заказа' })
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  preOrderCost: number;

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
}
