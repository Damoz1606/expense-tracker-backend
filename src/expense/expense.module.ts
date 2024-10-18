import { Module } from '@nestjs/common';
import { ExpenseService } from './services/expense.service';
import { ExpenseController } from './controllers/expense.controller';
import { ExpenseRepository } from './repositories/expense.repository';
import { ExpenseSearchService } from './services/expense-search.service';

@Module({
  controllers: [
    ExpenseController
  ],
  providers: [
    ExpenseRepository,
    ExpenseService,
    ExpenseSearchService
  ],
  exports: [
    ExpenseSearchService
  ]
})
export class ExpenseModule { }
