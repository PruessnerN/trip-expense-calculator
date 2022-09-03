import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Expense, TecModule, Trip, User } from '@trip-expense-calculator/backend/tec-api';

import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: ':memory:',
      dropSchema: true,
      entities: [Trip, User, Expense],
      synchronize: true,
    }),
    TecModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
