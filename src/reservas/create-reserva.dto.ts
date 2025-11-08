import {
  IsEmail,
  IsInt,
  IsISO8601,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateReservaDto {
  @IsOptional()
  @IsEmail()
  clienteEmail?: string; // solo admin/recepcionista crea para otro

  @IsInt()
  habitacionId: number; // IdHabitacion existente

  @IsISO8601()
  fechaEntrada: string;

  @IsISO8601()
  fechaSalida: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}
