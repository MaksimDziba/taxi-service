import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Shift } from './shift.model';
import { Vehicle } from '../vehicles/vehicle.model';
import { Driver } from '../drivers/driver.model';

//  ДОДЕЛАТЬ модель шифтс . наверное надо связать шифт водитель ТС.

@Table({
  tableName: 'shift_driver_vehicles',
  createdAt: false,
  updatedAt: false,
})
export class ShiftDriverVehicles extends Model<ShiftDriverVehicles> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Shift)
  @Column({ type: DataType.INTEGER })
  shiftID: number;

  @ForeignKey(() => Driver)
  @Column({ type: DataType.INTEGER })
  driverID: number;

  @ForeignKey(() => Vehicle)
  @Column({ type: DataType.INTEGER })
  vehicleID: number;
}
