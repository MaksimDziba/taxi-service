import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { DriverVehicles } from 'src/drivers/driver-vehicle.model';
import { Driver } from 'src/drivers/driver.model';

interface VehicleCreationsAttrs {
  id: number;
  gosNumber: string;
  dateManufacture: string;
  carModel: string;
  carColor: string;
  capacity: string;
  babyChair: boolean;
  maxCountPassenger: number;
}

@Table({ tableName: 'vehicles' })
export class Vehicle extends Model<Vehicle, VehicleCreationsAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'А100СМ37', description: 'гос. номер' })
  @Column({ type: DataType.STRING, allowNull: true })
  gosNumber: string;

  @ApiProperty({
    example: '10.10.2008',
    description: 'дата выпуска автомобиля',
  })
  @Column({ type: DataType.DATE, allowNull: true })
  dateManufacture: string;

  @ApiProperty({ example: 'ЛАДА 2108', description: 'марка автомобиля' })
  @Column({ type: DataType.STRING, allowNull: true })
  carModel: string;

  @ApiProperty({ example: 'вишневый', description: 'цвет кузова автомобиля' })
  @Column({ type: DataType.STRING, allowNull: true })
  carColor: string;

  @ApiProperty({ example: '3 тонны', description: 'грузоподъемность' })
  @Column({ type: DataType.STRING, allowNull: true })
  capacity: string;

  @ApiProperty({ example: 'true', description: 'детское кресло' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  babyChair: boolean;

  @ApiProperty({ example: '3', description: 'макс. кол-во пассажиров' })
  @Column({ type: DataType.NUMBER, defaultValue: false })
  maxCountPassenger: number;

  @BelongsToMany(() => Driver, () => DriverVehicles)
  drivers: Driver[];
}
