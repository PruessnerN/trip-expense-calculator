import { ExpenseDto } from './expense.dto';
import { UserDto } from './user.dto';

export class TripDto {
  id: string;

  name: string;

  description: string | null;

  slug: string;

  startDate: Date;

  endDate: Date;

  members?: UserDto[];

  expenses?: ExpenseDto[];

  updated: Date;

  created: Date;

  deleted: Date;
}
