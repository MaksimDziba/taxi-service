import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { Driver } from 'src/drivers/driver.model';
import { Shift } from 'src/shifts/shift.model';

@Table({ tableName: 'driver_shifts', createdAt: false, updatedAt: false })
export class DriverShifts extends Model<DriverShifts> {
  @ForeignKey(() => Driver)
  @Column({ type: DataType.INTEGER })
  driverID: number;

  @ForeignKey(() => Shift)
  @Column({ type: DataType.INTEGER })
  shiftID: number;
}
