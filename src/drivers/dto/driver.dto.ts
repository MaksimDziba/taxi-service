import { ApiProperty } from '@nestjs/swagger';
import { Vehicle } from 'src/vehicles/vehicle.model';

export class DriverDto {
  @ApiProperty({ example: '2', description: 'ID водителя' })
  readonly id: number;

  @ApiProperty({ example: 'Иванов Иван Иванович', description: 'ФИО' })
  readonly name: string;

  @ApiProperty({ example: '12 34 567890', description: 'паспорт' })
  readonly passport: string;

  @ApiProperty({ example: 'г.Иванов, ул.Ленина', description: 'адрес' })
  readonly address: string;

  @ApiProperty({ example: '89159874321', description: 'номер телефона' })
  readonly phone: string;

  @ApiProperty({
    example: '37 ВА 567890',
    description: 'водительское удостоверение',
  })
  readonly driverLicense: string;

  @ApiProperty({ example: '2022/123456789', description: 'номер договора' })
  readonly contractNumber: string;

  @ApiProperty({
    example: 'телефон/терминал/наличными',
    description: 'метод оплаты',
  })
  readonly paymentMethod: string;

  @ApiProperty({ example: 'true', description: 'перевозка домашних животных' })
  readonly transportationAnimals: boolean;

  @ApiProperty({ example: '[3, 2]', description: 'Водители' })
  readonly vehicles: Vehicle[];
}
