import { Column, DataType, Model, Table } from 'sequelize-typescript';

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

@Table({ tableName: 'Drivers' })
export class Driver extends Model<Driver, DriverCreationsAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: true })
  name: string;

  @Column({ type: DataType.STRING, allowNull: true })
  passport: string;

  @Column({ type: DataType.STRING, allowNull: true })
  address: string;

  @Column({ type: DataType.STRING, allowNull: true })
  phone: string;

  @Column({ type: DataType.STRING, allowNull: true })
  driverLicense: string;

  @Column({ type: DataType.STRING, allowNull: true })
  contractNumber: string;

  @Column({ type: DataType.STRING, allowNull: true })
  paymentMethod: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  transportationAnimals: boolean;
}
