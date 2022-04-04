import { Controller, Get } from '@nestjs/common';

@Controller('/api')
export class AppController {
  @Get('/drivers')
  getDrivers() {
    return ['driver', 'some driver'];
  }
}
