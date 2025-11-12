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
import { EstanciasService } from './estancias.service';
import { CreateEstanciaDto } from './dto/create-estancia.dto';
import { UpdateEstanciaDto } from './dto/update-estancia.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AppRole } from '../common/roles.enum';

@UseGuards(AuthGuard('jwt'))
@Controller('estancias')
export class EstanciasController {
  constructor(private readonly service: EstanciasService) {}

  // Crear estancia: solo admin y recepcionista
  @UseGuards(RolesGuard)
  @Roles(AppRole.Admin, AppRole.Recepcionista)
  @Post()
  create(@Body() dto: CreateEstanciaDto) {
    return this.service.create(dto);
  }

  // Listar estancias (si quieres, luego filtramos por rol/cliente)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  // Actualizar: solo admin y recepcionista
  @UseGuards(RolesGuard)
  @Roles(AppRole.Admin, AppRole.Recepcionista)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEstanciaDto,
  ) {
    return this.service.update(id, dto);
  }

  // Eliminar: solo admin y recepcionista
  @UseGuards(RolesGuard)
  @Roles(AppRole.Admin, AppRole.Recepcionista)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
