import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { EstanciaHabitacionService } from './estancia-habitacion.service';
import { CreateEstanciaHabitacionDto } from './dto/create-estancia-habitacion.dto';
import { UpdateEstanciaHabitacionDto } from './dto/update-estancia-habitacion.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AppRole } from '../common/roles.enum';

@UseGuards(AuthGuard('jwt'))
@Controller('estancia-habitacion')
export class EstanciaHabitacionController {
  constructor(private readonly service: EstanciaHabitacionService) {}

  // Crear detalle de estancia-habitación: admin + recepcionista
  @UseGuards(RolesGuard)
  @Roles(AppRole.Admin, AppRole.Recepcionista)
  @Post()
  create(@Body() dto: CreateEstanciaHabitacionDto) {
    return this.service.create(dto);
  }

  // Listar todos los detalles
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // Obtener uno
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  // Actualizar
  @UseGuards(RolesGuard)
  @Roles(AppRole.Admin, AppRole.Recepcionista)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEstanciaHabitacionDto,
  ) {
    return this.service.update(id, dto);
  }

  // Eliminar
  @UseGuards(RolesGuard)
  @Roles(AppRole.Admin, AppRole.Recepcionista)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
