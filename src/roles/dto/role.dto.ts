import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/users.model';

export class RoleDto {
  @ApiProperty({ example: '2', description: 'ID водителя' })
  readonly id: number;

  @ApiProperty({ example: 'driver', description: 'Название роли' })
  value: string;

  @ApiProperty({ example: 'водитель', description: 'Описание роли' })
  readonly description: string;

  @ApiProperty({ example: '[3, 2]', description: 'Водители' })
  readonly users: User[];
}
