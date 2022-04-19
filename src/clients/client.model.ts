import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Order } from 'src/orders/order.model';

interface ClientCreationsAttrs {
  id: number;
  name: string;
  phone: string;
}

@Table({ tableName: 'clients' })
export class Client extends Model<Client, ClientCreationsAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Иванов Иван Иванович', description: 'ФИО' })
  @Column({ type: DataType.STRING, allowNull: true })
  name: string;

  @ApiProperty({ example: '89159874321', description: 'номер телефона' })
  @Column({ type: DataType.STRING, allowNull: true })
  phone: string;

  @HasMany(() => Order)
  clientOrders: Order[];
}
