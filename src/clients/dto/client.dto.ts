import { ApiProperty } from '@nestjs/swagger';

export class ClientDto {
  @ApiProperty({ example: '2', description: 'ID водителя' })
  readonly id: number;

  @ApiProperty({ example: 'Иванов Иван Иванович', description: 'ФИО' })
  readonly name: string;

  @ApiProperty({ example: '+78881234567', description: 'телефон' })
  readonly phone: string;
}
