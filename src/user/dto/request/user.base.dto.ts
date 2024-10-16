import { User as PrismaUser } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserRequest implements Omit<PrismaUser, 'id'> {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    public readonly email: string;

    @IsString()
    @IsNotEmpty()
    public readonly username: string;

    @IsString()
    @IsNotEmpty()
    public readonly password: string;
}