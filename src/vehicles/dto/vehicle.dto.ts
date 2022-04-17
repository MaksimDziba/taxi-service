import { ApiProperty } from '@nestjs/swagger';
import { Driver } from 'src/drivers/driver.model';

export class VehicleDto {
  @ApiProperty({ example: '2', description: 'ID транспортного средства' })
  readonly id: number;

  @ApiProperty({ example: 'А100СМ37', description: 'гос. номер' })
  readonly gosNumber: string;

  @ApiProperty({
    example: '10.10.2008',
    description: 'дата выпуска автомобиля',
  })
  readonly dateManufacture: Date;

  @ApiProperty({ example: 'ЛАДА 2108', description: 'марка автомобиля' })
  readonly carModel: string;

  @ApiProperty({ example: 'вишневый', description: 'цвет кузова автомобиля' })
  readonly carColor: string;

  @ApiProperty({ example: '3 тонны', description: 'грузоподъемность' })
  readonly capacity: string;

  @ApiProperty({ example: 'true', description: 'детское кресло' })
  readonly babyChair: boolean;

  @ApiProperty({ example: '3', description: 'макс. кол-во пассажиров' })
  readonly maxCountPassenger: number;

  @ApiProperty({ example: '[3, 2]', description: 'Водители' })
  readonly drivers: Driver[];
}
