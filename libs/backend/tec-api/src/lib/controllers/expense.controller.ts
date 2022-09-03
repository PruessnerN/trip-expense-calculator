import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateExpenseDto, UpdateExpenseDto } from '@trip-expense-calculator/api-interfaces';

import { ExpenseService } from '../services/expense.service';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return await this.expenseService.create(createExpenseDto);
  }

  @Get()
  async findAll() {
    return await this.expenseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.expenseService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    const found = await this.expenseService.findOne(id);

    if (!found) throw new NotFoundException();

    return await this.expenseService.update(updateExpenseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.expenseService.remove(id);
  }
}
