import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Vehicle } from 'src/vehicles/vehicle.model';
import { Driver } from './driver.model';

@Table({ tableName: 'driver_vehicles', createdAt: false, updatedAt: false })
export class DriverVehicles extends Model<Driver> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Driver)
  @Column({ type: DataType.INTEGER })
  driverID: number;

  @ForeignKey(() => Vehicle)
  @Column({ type: DataType.INTEGER })
  vehicleID: number;
}
