import { User as PrismaUser } from "@prisma/client";
import { Expose } from "class-transformer";

export class User implements PrismaUser {
    @Expose() public readonly id: number;
    @Expose() public readonly email: string;
    @Expose() public readonly username: string;
}