export class CreateDriverDto {
  readonly name: string;
  readonly passport: string;
  readonly address: string;
  readonly phone: string;
  readonly driverLicense: string;
  readonly contractNumber: number;
  readonly paymentMethod: string;
  readonly transportationAnimals: boolean;
}
