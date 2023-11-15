import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class AddVoyageDto {
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  departureDate: Date;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  arrivalDate: Date;

  @IsString()
  @IsNotEmpty()
  airline: string;

  @IsString()
  @IsNotEmpty()
  departureLocation: string;

  @IsString()
  @IsNotEmpty()
  arrivalLocation: string;

  @IsNumber()
  @IsNotEmpty()
  weightKilos: number;
}