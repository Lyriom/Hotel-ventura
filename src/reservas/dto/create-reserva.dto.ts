import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateReservaDto {
  @IsOptional()
  @IsString()
  CodigoReserva?: string;

  @IsInt()
  IdCliente: number;

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

  @IsString()
  @IsNotEmpty()
  Estado: string; // ej: 'pendiente', 'confirmada', 'cancelada'

  @IsOptional()
  @IsNumber()
  @Min(0)
  MontoTotalEstimado?: number;

  @IsOptional()
  @IsString()
  Observaciones?: string;
}
