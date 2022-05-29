import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Driver } from 'src/drivers/driver.model';
import { Order } from 'src/orders/order.model';

interface ShiftCreationsAttrs {
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

@Table({ tableName: 'shifts' })
export class Shift extends Model<Shift, ShiftCreationsAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'working - hold - not_working ',
    description: 'Статус водителя',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  readonly status: string;

  @ApiProperty({
    example: '10.10.2008 15:30',
    description: 'Время выхода на смену',
  })
  @Column({ type: DataType.DATE, allowNull: true })
  readonly startTime: Date;

  @ApiProperty({
    example: '1 - 2 - 3 - 4',
    description: 'Приоритет выдачи заказов',
  })
  @Column({ type: DataType.INTEGER, allowNull: true })
  readonly priority: number;

  @ApiProperty({ example: 'А100СМ37', description: 'гос. номер' })
  @Column({ type: DataType.STRING, allowNull: true })
  readonly gosNumber: string;

  @ApiProperty({ example: 'ЛАДА 2108', description: 'марка автомобиля' })
  @Column({ type: DataType.STRING, allowNull: true })
  readonly carModel: string;

  @ApiProperty({ example: 'вишневый', description: 'цвет кузова автомобиля' })
  @Column({ type: DataType.STRING, allowNull: true })
  readonly carColor: string;

  @BelongsTo(() => Driver)
  public driver: Driver;

  @ForeignKey(() => Driver)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  driverID: number;

  @HasMany(() => Order)
  orders: Order[];
}
