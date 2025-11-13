import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateHabitacionDto {
  @IsString()
  @IsNotEmpty()
  Numero: string;

  @IsInt()
  @Min(1)
  IdTipoHabitacion: number;

  @IsInt()
  @Min(1)
  NumeroCamas: number;

  @IsString()
  @IsNotEmpty()
  TipoTV: string;

  @IsString()
  @IsNotEmpty()
  Estado: string; // 'disponible', 'ocupada', etc.
}
