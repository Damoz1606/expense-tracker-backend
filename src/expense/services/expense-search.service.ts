import { Injectable } from "@nestjs/common";
import { ISearch } from "src/shared/interfaces/search.interface";
import { Expense } from "../dto/response/expense.base.dto";
import { FilterMetaDto, CountMetaDto, PageDto } from "src/shared/dtos/filter.base.dto";

@Injectable()
export class ExpenseSearchService implements ISearch<Expense> {
    
    async search(filter: FilterMetaDto): Promise<Expense[]> { return; }

    async count(filter: CountMetaDto): Promise<PageDto> { return; }
}