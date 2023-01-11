import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Shift } from '../shifts/shift.model';
import { Order } from './order.model';

@Table({ tableName: 'shift_orders', createdAt: false, updatedAt: false })
export class ShiftOrders extends Model<ShiftOrders> {
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

  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER, allowNull: true })
  orderID: number;
}