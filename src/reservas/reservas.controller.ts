import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { CreateReservaDto } from './create-reserva.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Post()
  create(@Req() req, @Body() dto: CreateReservaDto) {
    return this.reservasService.create(req.user, dto);
  }

  @Get()
  findAll() {
    return this.reservasService.findAll();
  }
}
