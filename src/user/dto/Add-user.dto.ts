import { IsOptional, IsString } from "class-validator";

export class AddUserDto {

    @IsOptional()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName: string;
}