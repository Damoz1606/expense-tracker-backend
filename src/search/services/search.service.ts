import { Inject, Injectable } from '@nestjs/common';
import { Expense } from 'src/expense/dto/response/expense.base.dto';
import { ExpenseSearchService } from 'src/expense/services/expense-search.service';
import { FilterMetaDto, CountMetaDto, PageDto } from 'src/shared/dtos/filter.base.dto';
import { ISearch } from 'src/shared/interfaces/search.interface';
import { SearchKey } from '../types/search-key.type';

@Injectable()
export class SearchService {

    private readonly service: Record<SearchKey, ISearch<Expense>>

    constructor(
        @Inject(ExpenseSearchService) expenseService: ISearch<Expense>
    ) {
        this.service = {
            expense: expenseService
        }
    }

    async search(key: SearchKey, filter: FilterMetaDto): Promise<any[]> {
        return this.service[key].search(filter);
    }

    async count(key: SearchKey, filter: CountMetaDto): Promise<PageDto> {
        return this.service[key].count(filter);
    }

}
