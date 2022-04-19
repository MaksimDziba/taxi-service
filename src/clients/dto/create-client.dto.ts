import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({ example: 'Иванов Иван Иванович', description: 'ФИО' })
  readonly name: string;

  @ApiProperty({ example: '+78881234567', description: 'телефон' })
  readonly phone: string;
}
