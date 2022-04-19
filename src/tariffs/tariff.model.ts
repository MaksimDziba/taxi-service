import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Order } from 'src/orders/order.model';

interface TariffCreationsAttrs {
  id: number;
  type: string;
  costPerKilometer: number;
  costOutOfCity: number;
  costBabyChair: number;
  costDownTime: number;
  costTransportingAnimals: number;
}

@Table({ tableName: 'tariffs' })
export class Tariff extends Model<Tariff, TariffCreationsAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'комфорт, комфорт+, бизнес',
    description: 'Тип тарифа',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  type: string;

  @ApiProperty({ example: '30', description: 'Цена за километр' })
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  costPerKilometer: number;

  @ApiProperty({ example: '30', description: 'Цена за километр за городом' })
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  costOutOfCity: number;

  @ApiProperty({ example: '150', description: 'Цена за детское кресло' })
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  costBabyChair: number;

  @ApiProperty({ example: '150', description: 'Цена за простой' })
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  costDownTime: number;

  @ApiProperty({
    example: '150',
    description: 'Цена за перевозку домашних животных',
  })
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  costTransportingAnimals: number;

  @HasMany(() => Order)
  tariffOrders: Order[];
}
