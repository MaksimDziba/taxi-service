import { ApiProperty } from '@nestjs/swagger';

export class CreateShiftDto {
  @ApiProperty({
    example: 'working - hold - not_working ',
    description: 'Статус водителя',
  })
  readonly status: string;

  @ApiProperty({
    example: '10.10.2008 15:30',
    description: 'Время выхода на смену',
  })
  readonly startTime: string;

  @ApiProperty({
    example: '1 - 2 - 3 - 4',
    description: 'Приоритет выдачи заказов',
  })
  readonly priority: number;

  @ApiProperty({ example: 'А100СМ37', description: 'гос. номер' })
  readonly gosNumber: string;

  @ApiProperty({ example: 'ЛАДА 2108', description: 'марка автомобиля' })
  readonly carModel: string;

  @ApiProperty({ example: 'вишневый', description: 'цвет кузова автомобиля' })
  readonly carColor: string;
}
