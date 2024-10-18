import { Expose } from "class-transformer";
import { IResponseArray } from "src/shared/interfaces/response-array.interface";

export class SearchArray implements IResponseArray<any> {
    @Expose() data: any[];
}