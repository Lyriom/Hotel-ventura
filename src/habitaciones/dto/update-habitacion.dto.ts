import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateHabitacionDto {
  @IsOptional()
  @IsString()
  Numero?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  IdTipoHabitacion?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  NumeroCamas?: number;

  @IsOptional()
  @IsString()
  TipoTV?: string;

  @IsOptional()
  @IsString()
  Estado?: string;
}
