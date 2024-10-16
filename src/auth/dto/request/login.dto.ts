import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginAuth {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    public readonly email: string;

    @IsString()
    @IsNotEmpty()
    public readonly password: string;
}