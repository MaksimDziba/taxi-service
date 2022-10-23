import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: '+79158291111', description: 'Телефон' })
  @IsString({ message: 'Должно быть строкой' })
  readonly phone: string;

  @ApiProperty({ example: '12345', description: 'пароль' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
  readonly password: string;

  @ApiProperty({ example: 'driver', description: 'роль' })
  @IsString({ message: 'Должно быть строкой' })
  readonly role: string;
}
