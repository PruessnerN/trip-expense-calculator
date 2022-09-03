export class CreateTripDto {
  name: string;

  description: string | null;

  slug?: string;

  startDate: Date;

  endDate: Date;
}
