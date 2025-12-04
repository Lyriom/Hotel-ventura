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
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AppRole } from '../common/roles.enum';

@UseGuards(AuthGuard('jwt'))
@Controller('clientes')
export class ClientesController {
  constructor(private readonly service: ClientesService) {}

  // Crear cliente: admin + recepcionista
  @UseGuards(RolesGuard)
  @Roles(AppRole.Admin, AppRole.Recepcionista, AppRole.Cliente)
  @Post()
  create(@Body() dto: CreateClienteDto) {
    return this.service.create(dto);
  }

  // Listar clientes: admin + recepcionista
  @UseGuards(RolesGuard)
  @Roles(AppRole.Admin, AppRole.Recepcionista)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // Ver un cliente por id
  @UseGuards(RolesGuard)
  @Roles(AppRole.Admin, AppRole.Recepcionista)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  // Actualizar cliente
  @UseGuards(RolesGuard)
  @Roles(AppRole.Admin, AppRole.Recepcionista)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateClienteDto,
  ) {
    return this.service.update(id, dto);
  }

  // Eliminar cliente
  @UseGuards(RolesGuard)
  @Roles(AppRole.Admin, AppRole.Recepcionista)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
