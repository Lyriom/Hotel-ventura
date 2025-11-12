import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateHabitacionDto {
  @IsOptional() @IsString() Numero?: string;
  @IsOptional() @IsInt() IdTipoHabitacion?: number;
  @IsOptional() @IsInt() NumeroCamas?: number;
  @IsOptional() @IsString() TipoTV?: string;
  @IsOptional() @IsString() Estado?: string;
}
