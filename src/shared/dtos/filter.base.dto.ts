import { Expose, Type } from "class-transformer";
import { IsInt, IsJSON, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export interface PageMeta {
    skip: number;
    take: number;
}

export interface FilterMeta {
    filter: string;
}

export class CountMetaDto implements Partial<FilterMeta>, Omit<PageMeta, 'skip'> {
    @IsNumber()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    public readonly take: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public readonly filter?: string;

    @IsOptional()
    @IsJSON()
    @IsNotEmpty()
    public readonly extras?: any;
}

export class FilterMetaDto extends CountMetaDto implements Partial<FilterMeta>, PageMeta {
    @IsNumber()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    public readonly skip: number;
}

export class PageDto {
    @Expose() public readonly pages: number;
}