import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { SearchService } from '../services/search.service';
import { FilterMetaDto, PageDto } from 'src/shared/dtos/filter.base.dto';
import { SearchKey } from '../types/search-key.type';
import { plainToInstance } from 'class-transformer';
import { SearchArray } from '../dto/response/search-array.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { TokenPayload } from 'src/auth/token/token.payload';

@UseGuards(JwtAuthGuard)
@Controller('search')
export class SearchController {
    constructor(
        private readonly service: SearchService
    ) { }

    @Get(':key')
    async search(
        @Query() { extras, ...query }: FilterMetaDto,
        @Param('key') key: SearchKey,
        @CurrentUser() user: TokenPayload
    ): Promise<SearchArray> {
        const data = await this.service.search(key, query, {
            ...extras,
            user: user.sub
        });
        return plainToInstance(SearchArray, { data });
    }

    @Get(':key/pages')
    async count(
        @Query() { extras, ...query }: FilterMetaDto,
        @Param('key') key: SearchKey,
        @CurrentUser() user: TokenPayload
    ): Promise<PageDto> {
        const pages = await this.service.count(key, query, {
            ...extras,
            user: user.sub
        });
        return plainToInstance(PageDto, { pages });
    }
}