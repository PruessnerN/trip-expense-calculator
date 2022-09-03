import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExpenseController } from './controllers/expense.controller';
import { TripController } from './controllers/trip.controller';
import { UserController } from './controllers/user.controller';
import { Expense } from './entities/expense.entity';
import { Trip } from './entities/trip.entity';
import { User } from './entities/user.entity';
import { ExpenseService } from './services/expense.service';
import { TripService } from './services/trip.service';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trip, Expense, User])],
  controllers: [TripController, ExpenseController, UserController],
  providers: [TripService, ExpenseService, UserService],
  exports: [],
})
export class TecApiModule {}
