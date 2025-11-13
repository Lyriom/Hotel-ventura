import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  Min,
  IsDateString,
} from 'class-validator';

export class CreateEstanciaDto {
  @IsInt()
  IdReserva: number;

  @IsInt()
  IdCliente: number;

  @IsOptional()
  @IsDateString()
  FechaCheckIn?: string;

  @IsOptional()
  @IsDateString()
  HoraCheckIn?: string;

  @IsOptional()
  @IsDateString()
  FechaCheckOut?: string;

  @IsOptional()
  @IsDateString()
  HoraCheckOut?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  MontoTotalFinal?: number;

  @IsString()
  @IsNotEmpty()
  Estado: string;
}
