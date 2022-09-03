import { InjectRepository } from '@nestjs/typeorm';

import { CreateExpenseDto, UpdateExpenseDto } from '@trip-expense-calculator/api-interfaces';
import { Repository } from 'typeorm';

import { Expense } from '../entities/expense.entity';

export class ExpenseService {
  constructor(@InjectRepository(Expense) private repository: Repository<Expense>) {}

  create(createExpenseDto: CreateExpenseDto) {
    return this.repository.create(createExpenseDto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  update(id: string, updateExpenseDto: UpdateExpenseDto) {
    return this.repository.update(id, updateExpenseDto);
  }

  remove(id: string) {
    return this.repository.softDelete(id);
  }
}
