import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AppRole } from '../common/roles.enum';

@UseGuards(AuthGuard('jwt'))
@Controller('reservas')
export class ReservasController {
  constructor(private readonly service: ReservasService) {}

  // Crear reserva: cliente, recepcionista, admin
  @UseGuards(RolesGuard)
  @Roles(AppRole.Admin, AppRole.Recepcionista, AppRole.Cliente)
  @Post()
  create(@Body() dto: CreateReservaDto) {
    return this.service.create(dto);
  }

  // Listar reservas: admin y recepcionista
  @UseGuards(RolesGuard)
  @Roles(AppRole.Admin, AppRole.Recepcionista, AppRole.Cliente)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // Ver una reserva: admin y recepcionista
  @UseGuards(RolesGuard)
  @Roles(AppRole.Admin, AppRole.Recepcionista)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  // Actualizar reserva: admin y recepcionista
  @UseGuards(RolesGuard)
  @Roles(AppRole.Admin, AppRole.Recepcionista)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReservaDto,
  ) {
    return this.service.update(id, dto);
  }

  // Eliminar reserva: admin y recepcionista
  @UseGuards(RolesGuard)
  @Roles(AppRole.Admin, AppRole.Recepcionista)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
