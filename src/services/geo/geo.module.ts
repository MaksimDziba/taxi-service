import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { GeoService } from './geo.service';

@Module({
  providers: [GeoService],
  imports: [HttpModule],
  exports: [GeoService],

})

export class GeoModule {}