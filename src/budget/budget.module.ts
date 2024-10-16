import { Module } from '@nestjs/common';
import { BudgetService } from './services/budget.service';
import { BudgetController } from './controllers/budget.controller';
import { BudgetRepository } from './repositories/budget.repository';

@Module({
  controllers: [
    BudgetController
  ],
  providers: [
    BudgetRepository,
    BudgetService
  ],
})
export class BudgetModule { }
