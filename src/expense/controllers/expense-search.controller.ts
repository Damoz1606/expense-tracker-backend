import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CountMetaDto, FilterMetaDto, PageDto } from 'src/shared/dtos/filter.base.dto';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { TokenPayload } from 'src/auth/token/token.payload';
import { ApiTags } from '@nestjs/swagger';
import { ExpenseSearchService } from '../services/expense-search.service';
import { ExpenseArray } from '../dto/response/expense-array.dto';

@ApiTags('Search')
@UseGuards(JwtAuthGuard)
@Controller('search/expense')
export class ExpenseSearchController {
    constructor(
        private readonly service: ExpenseSearchService
    ) { }

    @Get()
    async search(
        @Query() { extras, filter, ...pagination }: FilterMetaDto,
        @CurrentUser() user: TokenPayload
    ): Promise<ExpenseArray> {
        const data = await this.service.search({ filter }, pagination, { ...extras, user: user.sub });
        return plainToInstance(ExpenseArray, { data });
    }

    @Get('pages')
    async count(
        @Query() { extras, filter, take }: CountMetaDto,
        @CurrentUser() user: TokenPayload
    ): Promise<PageDto> {
        const pages = await this.service.count(take, { filter }, { ...extras, user: user.sub });
        return plainToInstance(PageDto, pages);
    }
}