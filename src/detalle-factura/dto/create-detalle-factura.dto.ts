import { IsNotEmpty, IsNumber, IsOptional, IsString, IsInt, Min } from 'class-validator';

export class CreateDetalleFacturaDto {
  @IsInt()
  @Min(1)
  IdFactura: number;

  @IsString()
  @IsNotEmpty()
  Concepto: string;

  @IsNumber()
  @Min(0)
  Cantidad: number;

  @IsNumber()
  @Min(0)
  PrecioUnitario: number;

  @IsNumber()
  @Min(0)
  TotalLinea: number;

  @IsOptional()
  @IsInt()
  IdEstanciaHabitacion?: number;
}
