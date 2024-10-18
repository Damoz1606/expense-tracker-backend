import { FilterMeta, PageDto, PageMeta } from "../dtos/filter.base.dto";

export interface ISearch<T> {
    /**
     * Apply a pagination and filter
     * @param filter 
     * @returns Object inside a promise
     */
    search: (filter: Partial<FilterMeta>, page: PageMeta, extras: any) => Promise<T[]>;
    /**
     * Count the number of pages available with a specific filter
     * @param filter 
     * @returns PageDto object inside a promise
     */
    count: (take: number, filter: Partial<FilterMeta>, extras: any) => Promise<PageDto>
}