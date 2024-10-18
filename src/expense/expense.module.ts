import { Module } from '@nestjs/common';
import { ExpenseService } from './services/expense.service';
import { ExpenseController } from './controllers/expense.controller';
import { ExpenseRepository } from './repositories/expense.repository';
import { ExpenseSearchService } from './services/expense-search.service';
import { ExpenseSearchController } from './controllers/expense-search.controller';
import { ExpenseEventService } from './services/expense-event.service';

@Module({
  controllers: [
    ExpenseSearchController,
    ExpenseController
  ],
  providers: [
    ExpenseRepository,
    ExpenseEventService,
    ExpenseService,
    ExpenseSearchService
  ],
})
export class ExpenseModule { }
