import {
  IsInt,
  IsOptional,
  IsString,
  IsDateString,
  IsNumber,
  Min,
} from 'class-validator';

export class UpdateReservaDto {
  @IsOptional()
  @IsString()
  CodigoReserva?: string;

  @IsOptional()
  @IsInt()
  IdCliente?: number;

  @IsOptional()
  @IsInt()
  IdUsuario?: number;

  @IsOptional()
  @IsDateString()
  FechaReserva?: string;

  @IsOptional()
  @IsDateString()
  FechaEntradaPrevista?: string;

  @IsOptional()
  @IsDateString()
  FechaSalidaPrevista?: string;

  @IsOptional()
  @IsString()
  Estado?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  MontoTotalEstimado?: number;

  @IsOptional()
  @IsString()
  Observaciones?: string;
}
