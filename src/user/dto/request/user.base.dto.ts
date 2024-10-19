import { User as PrismaUser } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength } from "class-validator";

export class UserRequest implements Omit<PrismaUser, 'id'> {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @MaxLength(64)
    public readonly email: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(64)
    public readonly username: string;

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword({ minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    public readonly password: string;
}