import { CountMetaDto, FilterMetaDto, PageDto } from "../dtos/filter.base.dto";

export interface ISearch<T> {
    /**
     * Apply a pagination and filter
     * @param filter 
     * @returns Object inside a promise
     */
    search: (filter: FilterMetaDto) => Promise<T[]>;
    /**
     * Count the number of pages available with a specific filter
     * @param filter 
     * @returns PageDto object inside a promise
     */
    count: (filter: CountMetaDto) => Promise<PageDto>
}