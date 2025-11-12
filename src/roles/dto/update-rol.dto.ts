import { IsOptional, IsString } from 'class-validator';

export class UpdateRolDto {
  @IsOptional()
  @IsString()
  NombreRol?: string;
}
