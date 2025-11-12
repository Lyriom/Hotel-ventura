import { IsOptional, IsString } from 'class-validator';

export class UpdateClienteDto {
  @IsOptional()
  @IsString()
  Nombre?: string;

  @IsOptional()
  @IsString()
  Apellido?: string;

  @IsOptional()
  @IsString()
  Ciudad?: string;

  @IsOptional()
  @IsString()
  Correo?: string;

  @IsOptional()
  @IsString()
  Telefono?: string;

  @IsOptional()
  @IsString()
  DocumentoIdentidad?: string;
}
