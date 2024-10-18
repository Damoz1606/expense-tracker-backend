import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ISearch } from "src/shared/interfaces/search.interface";
import { Expense } from "../dto/response/expense.base.dto";
import { PageDto, FilterMeta, PageMeta } from "src/shared/dtos/filter.base.dto";
import { ExpenseRepository } from "../repositories/expense.repository";

@Injectable()
export class ExpenseSearchService implements ISearch<Expense> {

    constructor(
        @Inject(ExpenseRepository) private readonly repository: ExpenseRepository
    ) { }

    async search({ filter }: Partial<FilterMeta>, { skip, take }: PageMeta, extras: any): Promise<Expense[]> {
        if (!extras.user) throw new BadRequestException();
        const data = await this.repository.findMany({
            orderBy: {
                createAt: 'desc'
            },
            where: {
                budget: { userId: extras.user },
                OR: [
                    {
                        name: {
                            contains: filter,
                            mode: 'insensitive'
                        }
                    },
                    {
                        budget: {
                            name: {
                                contains: filter,
                                mode: 'insensitive'
                            }
                        }
                    }
                ]
            },
            select: {
                id: true,
                name: true,
                amount: true,
                createAt: true,
                budget: {
                    select: {
                        name: true
                    }
                }
            },
            skip: skip * take,
            take
        });
        return data.map(e => ({ ...e, budget: e.budget.name }));
    }


    async count(take: number, { filter }: Partial<FilterMeta>, extras: any): Promise<PageDto> {
        if (!extras.user) throw new BadRequestException();
        const count = await this.repository.count({
            where: {
                budget: { userId: extras.user },
                OR: [
                    {
                        name: {
                            contains: filter,
                            mode: 'insensitive'
                        }
                    },
                    {
                        budget: {
                            name: {
                                contains: filter,
                                mode: 'insensitive'
                            }
                        }
                    },
                ]
            }
        });

        return { pages: Math.ceil(count / take) }
    }
}