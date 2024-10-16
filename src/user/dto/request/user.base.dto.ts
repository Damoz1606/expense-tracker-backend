import { User as PrismaUser } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

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
    @IsStrongPassword({ minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    public readonly password: string;
}