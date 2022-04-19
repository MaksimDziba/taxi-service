import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    example: 'г.Иванов, ул.Ленина, д.3, кв. 43',
    description: 'Откуда поедите?',
  })
  readonly addressFrom: string;

  @ApiProperty({
    example: 'г.Иванов, ул.Ленина, д.3, кв. 43',
    description: 'Куда поедите?',
  })
  readonly addressTo: string;

  @ApiProperty({ example: '10.10.2022 15:30 ', description: 'Время заказа' })
  readonly timeOrder: Date;

  @ApiProperty({ example: '3', description: 'Макс. кол-во пассажиров' })
  readonly maxCountPassenger: number;

  @ApiProperty({ example: '250', description: 'Предварительная сто-ть заказа' })
  readonly preOrderCost: number;

  @ApiProperty({
    example: 'Иванов Иван Иванович',
    description: 'Предварительная сто-ть заказа',
  })
  readonly operatorName: string;
}
