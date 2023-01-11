import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/orders/order.model';

export class ShiftDto {
  @ApiProperty({ example: '2', description: 'ID транспортного средства' })
  readonly id: number;

  @ApiProperty({
    example: 'working - finished',
    description: 'Статус водителя',
  })
  readonly status: string;

  @ApiProperty({
    example: '10.10.2008 15:30',
    description: 'Время выхода на смену',
  })
  readonly startTime: Date;

  @ApiProperty({
    example: '10.10.2008 15:30',
    description: 'Время завершения смены',
  })
  readonly endTime: Date;

  @ApiProperty({
    example: '1 - 2 - 3 - 4',
    description: 'Приоритет выдачи заказов',
  })
  readonly priority: number;

  @ApiProperty({ example: 'вишневый', description: 'цвет кузова автомобиля' })
  readonly carColor: string;

  @ApiProperty({ example: 'ЛАДА 2108', description: 'марка автомобиля' })
  readonly carModel: string;

  @ApiProperty({ example: 'А100СМ37', description: 'гос. номер' })
  readonly carNumber: string;

  @ApiProperty({ example: '1', description: 'Водитель' })
  readonly driverID: number;

  @ApiProperty({ example: '4', description: 'Водитель' })
  readonly ordersID: Order[];
}
