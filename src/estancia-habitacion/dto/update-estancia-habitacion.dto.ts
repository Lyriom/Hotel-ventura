import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdateEstanciaHabitacionDto {
  @IsOptional()
  @IsInt()
  IdEstancia?: number;

  @IsOptional()
  @IsInt()
  IdHabitacion?: number;

  @IsOptional()
  @IsString()
  FechaEntradaReal?: string;

  @IsOptional()
  @IsString()
  HoraEntradaReal?: string;

  @IsOptional()
  @IsString()
  FechaSalidaReal?: string;

  @IsOptional()
  @IsString()
  HoraSalidaReal?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  TarifaPorNoche?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  TarifaPorHora?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  CantidadNoches?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  CantidadHoras?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  Subtotal?: number;
}
