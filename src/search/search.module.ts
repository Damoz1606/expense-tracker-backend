import { Module } from '@nestjs/common';
import { SearchService } from './services/search.service';
import { SearchController } from './controllers/search.controller';
import { ExpenseModule } from 'src/expense/expense.module';

@Module({
  imports: [
    ExpenseModule
  ],
  providers: [SearchService],
  controllers: [SearchController]
})
export class SearchModule { }
