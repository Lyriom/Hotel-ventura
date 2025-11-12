import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClienteDto {
  @IsNotEmpty()
  @IsString()
  Nombre: string;

  @IsNotEmpty()
  @IsString()
  Apellido: string;

  @IsNotEmpty()
  @IsString()
  Ciudad: string;

  @IsNotEmpty()
  @IsString()
  Correo: string;

  @IsNotEmpty()
  @IsString()
  Telefono: string;

  @IsOptional()
  @IsString()
  DocumentoIdentidad?: string;
}
