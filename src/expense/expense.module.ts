import { Module } from '@nestjs/common';
import { ExpenseService } from './services/expense.service';
import { ExpenseController } from './controllers/expense.controller';
import { ExpenseRepository } from './repositories/expense.repository';

@Module({
  controllers: [
    ExpenseController
  ],
  providers: [
    ExpenseRepository,
    ExpenseService
  ],
})
export class ExpenseModule { }
