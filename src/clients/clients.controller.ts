import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Client } from './client.model';
import { ClientsService } from './clients.service';
import { ClientDto } from './dto/client.dto';
import { CreateClientDto } from './dto/create-client.dto';

@ApiTags('Клиенты')
@Controller('clients')
export class ClientsController {
  constructor(private clientService: ClientsService) {}

  @ApiOperation({ summary: 'Добавление клиента' })
  @ApiResponse({ status: 200, type: Client })
  @Post()
  create(@Body() clientDto: CreateClientDto) {
    return this.clientService.createClient(clientDto);
  }

  @ApiOperation({ summary: 'Обновление данных клиента' })
  @ApiResponse({ status: 200, type: Client })
  @Put('/:id')
  update(@Param('id') clientID: number, @Body() clientDto: ClientDto) {
    return this.clientService.updateClient(clientID, clientDto);
  }

  @ApiOperation({ summary: 'Получить клиента по ИД ' })
  @ApiResponse({ status: 200, type: Client })
  @Get('/:id')
  getVehicleByValue(@Param('id') clientID: number) {
    return this.clientService.getClientByValue(clientID);
  }

  @ApiOperation({ summary: 'Поиск клиента по телефону' })
  @ApiResponse({ status: 200, type: Client })
  @Get('/phone')
  getDriversByPhone(@Param('phone') phone: string) {
    return this.clientService.getClientByPhone(phone);
  }

  @ApiOperation({ summary: 'Получение всех клиентов' })
  @ApiResponse({ status: 200, type: [Client] })
  @Get()
  getAllClients(@Query() options) {
    return this.clientService.getAllClients(options);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.clientService.removeClient(id);
  }
}
