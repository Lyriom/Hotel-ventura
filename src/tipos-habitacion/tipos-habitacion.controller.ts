import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { TiposHabitacionService } from './tipos-habitacion.service';
import { CreateTipoHabitacionDto } from './dto/create-tipo-habitacion.dto';
import { UpdateTipoHabitacionDto } from './dto/update-tipo-habitacion.dto';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AppRole } from '../common/roles.enum';
import { AuthGuard } from '@nestjs/passport';

@Controller('tipos-habitacion')
@UseGuards(AuthGuard('jwt')) // todas requieren estar logueado
export class TiposHabitacionController {
  constructor(private readonly service: TiposHabitacionService) {}

  @UseGuards(RolesGuard)
  @Roles(AppRole.Admin, AppRole.Recepcionista)
  @Post()
  create(@Body() dto: CreateTipoHabitacionDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles(AppRole.Admin, AppRole.Recepcionista)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTipoHabitacionDto) {
    return this.service.update(id, dto);
  }

  @UseGuards(RolesGuard)
  @Roles(AppRole.Admin, AppRole.Recepcionista)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
