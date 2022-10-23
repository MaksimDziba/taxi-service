import { ApiProperty } from '@nestjs/swagger';
import { Shift } from 'src/shifts/shift.model';

export class OrderDto {
  @ApiProperty({ example: '2', description: 'ID заказа' })
  readonly id: number;

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

  @ApiProperty({
    example: 'pending - accepted - process - finished',
    description: 'статус заказа',
  })
  readonly status: string;

  @ApiProperty({ example: '10.10.2022 15:30 ', description: 'Время заказа' })
  readonly timeOrder: Date;

  @ApiProperty({ example: '3', description: 'Макс. кол-во пассажиров' })
  readonly maxCountPassenger: number;

  @ApiProperty({ example: '250', description: 'Предварительная сто-ть заказа' })
  readonly preOrderCost: number;

  @ApiProperty({
    example: 'Иванов Иван Иванович',
    description: 'ФИО оператора',
  })
  readonly operatorName: string;

  @ApiProperty({ example: 'true', description: 'Перевозка домашних животных' })
  readonly transportationAnimals: boolean;

  @ApiProperty({ example: 'true', description: 'Детское кресло' })
  readonly babyChair: boolean;

  @ApiProperty({ example: '3', description: 'Клиент ИД' })
  readonly clientID: number;

  @ApiProperty({ example: '23', description: 'Тариф ИД' })
  readonly tariffID: number;

  @ApiProperty({ example: '23', description: 'Смена водителя' })
  readonly shifts: Shift[];
}
