import { Expose } from "class-transformer";

export class TokenRSDto {
    @Expose() public readonly access: string;
}