import { Controller, Get, Param, Query } from '@nestjs/common';
import { SearchService } from '../services/search.service';
import { FilterMetaDto, PageDto } from 'src/shared/dtos/filter.base.dto';
import { SearchKey } from '../types/search-key.type';
import { plainToInstance } from 'class-transformer';
import { SearchArray } from '../dto/response/search-array.dto';

@Controller('search')
export class SearchController {
    constructor(
        private readonly service: SearchService
    ) { }

    @Get(':key')
    async search(
        @Query() query: FilterMetaDto,
        @Param('key') key: SearchKey
    ): Promise<SearchArray> {
        const data = await this.service.search(key, query);
        return plainToInstance(SearchArray, { data });
    }

    @Get(':key/pages')
    async count(
        @Query() query: FilterMetaDto,
        @Param('key') key: SearchKey
    ): Promise<PageDto> {
        const pages = await this.service.count(key, query);
        return plainToInstance(PageDto, { pages });
    }
}