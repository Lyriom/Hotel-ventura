import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateHabitacionDto {
  @IsNotEmpty() Numero: string;

  @Type(() => Number) @IsInt() @Min(1)
  IdTipoHabitacion: number;

  @Type(() => Number) @IsInt() @Min(1)
  NumeroCamas: number;

  @IsNotEmpty() TipoTV: string;

  @IsNotEmpty() Estado: string; // 'disponible' | 'ocupada' | 'mantenimiento'
}
