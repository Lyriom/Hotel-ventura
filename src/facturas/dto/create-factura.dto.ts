import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  IsDateString,
} from 'class-validator';

export class CreateFacturaDto {
  @IsString()
  @IsNotEmpty()
  NumeroFactura: string;

  @IsInt()
  IdCliente: number;

  @IsInt()
  IdEstancia: number;

  @IsInt()
  IdUsuario: number;

  @IsDateString()
  FechaEmision: string; // <- OBLIGATORIA

  @IsNumber()
  @Min(0)
  Subtotal: number;

  @IsNumber()
  @Min(0)
  Impuesto: number;

  @IsNumber()
  @Min(0)
  Total: number;

  @IsString()
  @IsNotEmpty()
  Estado: string;
}
