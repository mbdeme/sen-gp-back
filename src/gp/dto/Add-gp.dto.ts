import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class AddGpDto {
    
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber()
    phoneNumber: string;
}