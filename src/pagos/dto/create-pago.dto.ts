import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreatePagoDto {
  @IsInt()
  IdFactura: number;

  @IsString()
  @IsNotEmpty()
  FechaPago: string; // se convierte a Date en el service

  @IsNumber()
  @Min(0)
  Monto: number;

  @IsString()
  @IsNotEmpty()
  MetodoPago: string;

  @IsOptional()
  @IsString()
  Referencia?: string;

  @IsString()
  @IsNotEmpty()
  Estado: string;
}
