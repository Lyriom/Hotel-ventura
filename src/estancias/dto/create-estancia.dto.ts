import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEstanciaDto {
  @IsInt()
  IdReserva: number;

  @IsInt()
  IdCliente: number;

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

  @IsNotEmpty()
  @IsString()
  Estado: string;
}
