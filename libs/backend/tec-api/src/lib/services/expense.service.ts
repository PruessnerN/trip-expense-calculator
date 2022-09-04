import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateExpenseDto, UpdateExpenseDto } from '@trip-expense-calculator/api-interfaces';
import { Repository } from 'typeorm';

import { Expense } from '../entities/expense.entity';

export class ExpenseService {
  constructor(@InjectRepository(Expense) private repository: Repository<Expense>) {}

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    return await this.repository.save({
      ...createExpenseDto,
    });
  }

  async findAll(): Promise<Expense[]> {
    return await this.repository.find();
  }

  async findOne(id: string): Promise<Expense> {
    const result = await this.repository.findOne({ where: { id } });

    if (!result) throw new NotFoundException();

    return result;
  }

  async update(updateExpenseDto: UpdateExpenseDto): Promise<Expense> {
    return await this.repository.save(updateExpenseDto);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.repository.softDelete(id);

    return result.affected === 1;
  }
}
