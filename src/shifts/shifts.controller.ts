import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Смены')
@Controller('shifts')
export class ShiftsController {}
