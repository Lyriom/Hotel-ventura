import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateTipoHabitacionDto {
  @IsNotEmpty() NombreTipo: string;
  @IsInt() @Min(1) Capacidad: number;
  @IsNumber() @Min(0) PrecioBaseNoche: number;
  @IsNumber() @Min(0) PrecioBaseHora: number;
}
