import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateEstanciaDto {
  @IsOptional()
  @IsInt()
  IdReserva?: number;

  @IsOptional()
  @IsInt()
  IdCliente?: number;

  @IsOptional()
  @IsString()
  FechaCheckIn?: string;

  @IsOptional()
  @IsString()
  HoraCheckIn?: string;

  @IsOptional()
  @IsString()
  FechaCheckOut?: string;

  @IsOptional()
  @IsString()
  HoraCheckOut?: string;

  @IsOptional()
  @IsNumber()
  MontoTotalFinal?: number;

  @IsOptional()
  @IsString()
  Estado?: string;
}
