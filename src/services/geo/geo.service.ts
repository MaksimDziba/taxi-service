import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { HttpService } from "@nestjs/axios";

interface GeoData {
  suggestions: {
    data: {
      geo_lat: string;
      geo_lon: string;
    };
    unrestricted_value: string;
    value: string;
  }[];
}


@Injectable()
export class GeoService {
  constructor(private readonly httpService: HttpService) {}

  async getAddressData(query: string): Promise<GeoData> {
    const key = process.env.DADATA_TOKEN;

    const url =
      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";

      try {
        const response = await this.httpService.axiosRef.post(
          url,
          JSON.stringify({ 
            query, 
            count: 3,
          }),
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Token ${key}`,
            },
          }
          );

          return response.data || [];
      } catch (error) {
        throw new HttpException(
          'Не удалось получить геолокацию по адресу',
          HttpStatus.NOT_FOUND,
        );
      }
  }

  async getLocationByAddress(address: string) {
    const data = await this.getAddressData(address);

    const location = data.suggestions.find(location => location.value === address);

    if (location) {
      return {
        lat: location.data.geo_lat,
        lon: location.data.geo_lon,
      }
    }

    return {
      lat: '',
      lon: '',
    };
  }

  async getGeolocationOrder(addressFrom: string, addressTo: string) {
    const addressPromise = [
      this.getLocationByAddress(addressFrom),
      this.getLocationByAddress(addressTo)
    ]

    const [from, to] = await Promise.all(addressPromise);

    return { from, to };
  }

}