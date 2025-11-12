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
import { DetalleFacturaService } from './detalle-factura.service';
import { CreateDetalleFacturaDto } from './dto/create-detalle-factura.dto';
import { UpdateDetalleFacturaDto } from './dto/update-detalle-factura.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AppRole } from '../common/roles.enum';

@UseGuards(AuthGuard('jwt'))
@Controller('detalle-factura')
export class DetalleFacturaController {
  constructor(private readonly service: DetalleFacturaService) {}

  @UseGuards(RolesGuard)
  @Roles(AppRole.Admin, AppRole.Recepcionista)
  @Post()
  create(@Body() dto: CreateDetalleFacturaDto) {
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
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDetalleFacturaDto,
  ) {
    return this.service.update(id, dto);
  }

  @UseGuards(RolesGuard)
  @Roles(AppRole.Admin, AppRole.Recepcionista)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
