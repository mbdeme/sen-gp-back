import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
export class UpdateGpDto {

    

    @IsOptional()
    @IsEmail()
    email: string;
    
    @IsString()
    @IsOptional()
    phoneNumber: string;
}