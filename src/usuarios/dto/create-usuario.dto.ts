import {
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  Nombre: string;

  @IsString()
  @IsNotEmpty()
  Usuario: string;

  // Por ahora usas ContrasenaHash tal cual; luego puedes cambiar a bcrypt
  @IsString()
  @IsNotEmpty()
  ContrasenaHash: string;

  @IsInt()
  @Min(1)
  IdRol: number;
}
