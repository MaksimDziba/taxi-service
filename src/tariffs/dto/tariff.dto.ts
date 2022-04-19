import { ApiProperty } from '@nestjs/swagger';

export class TariffDto {
  @ApiProperty({ example: '2', description: 'ID тарифа' })
  readonly id: number;

  @ApiProperty({
    example: 'Эконом',
    description: 'Тип тарифа',
  })
  readonly type: string;

  @ApiProperty({ example: '', description: 'Цена за километр' })
  readonly costPerKilometer: number;

  @ApiProperty({ example: '', description: 'Цена за километр за городом' })
  readonly costOutOfCity: number;

  @ApiProperty({ example: '', description: 'Цена за детское кресло' })
  readonly costBabyChair: number;

  @ApiProperty({ example: '', description: 'Цена за простой' })
  readonly costDownTime: number;

  @ApiProperty({
    example: '',
    description: 'Цена за перевозку домашних животных',
  })
  readonly costTransportingAnimals: number;
}
