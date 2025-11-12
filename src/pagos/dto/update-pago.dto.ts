import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class UpdatePagoDto {
  @IsOptional()
  @IsInt()
  IdFactura?: number;

  @IsOptional()
  @IsString()
  FechaPago?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  Monto?: number;

  @IsOptional()
  @IsString()
  MetodoPago?: string;

  @IsOptional()
  @IsString()
  Referencia?: string;

  @IsOptional()
  @IsString()
  Estado?: string;
}
