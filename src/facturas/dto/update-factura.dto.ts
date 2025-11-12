import {
  IsString,
  IsOptional,
  IsInt,
  IsNumber,
  Min,
} from 'class-validator';

export class UpdateFacturaDto {
  @IsOptional()
  @IsString()
  NumeroFactura?: string;

  @IsOptional()
  @IsInt()
  IdCliente?: number;

  @IsOptional()
  @IsInt()
  IdEstancia?: number;

  @IsOptional()
  @IsInt()
  IdUsuario?: number;

  @IsOptional()
  @IsString()
  FechaEmision?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  Subtotal?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  Impuesto?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  Total?: number;

  @IsOptional()
  @IsString()
  Estado?: string;
}
