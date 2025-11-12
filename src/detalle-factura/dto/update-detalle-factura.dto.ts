import { IsOptional, IsString, IsNumber, IsInt, Min } from 'class-validator';

export class UpdateDetalleFacturaDto {
  @IsOptional()
  @IsInt()
  IdFactura?: number;

  @IsOptional()
  @IsString()
  Concepto?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  Cantidad?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  PrecioUnitario?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  TotalLinea?: number;

  @IsOptional()
  @IsInt()
  IdEstanciaHabitacion?: number;
}
