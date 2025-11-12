import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsNumber,
  IsOptional,
  Min,
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

  @IsString()
  @IsNotEmpty()
  FechaEmision: string; // Lo convertimos a Date en el service

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
