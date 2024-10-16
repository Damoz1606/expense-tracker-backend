import { Module } from '@nestjs/common';
import { BudgetService } from './services/budget.service';
import { BudgetController } from './controllers/budget.controller';
import { BudgetRepository } from './repositories/budget.repository';
import { BudgetActivityController } from './controllers/budget-activity.controller';
import { BudgetActivityService } from './services/budget-activity.service';

@Module({
  controllers: [
    BudgetActivityController,
    BudgetController
  ],
  providers: [
    BudgetRepository,
    BudgetActivityService,
    BudgetService
  ],
})
export class BudgetModule { }
