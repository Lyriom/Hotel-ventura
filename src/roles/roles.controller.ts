import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AppRole } from '../common/roles.enum';

@UseGuards(AuthGuard('jwt'))
@Controller('roles')
export class RolesController {
  constructor(private readonly service: RolesService) {}

  @UseGuards(RolesGuard)
  @Roles(AppRole.Admin)
  @Post()
  create(@Body() dto: CreateRolDto) {
    return this.service.create(dto);
  }

  @UseGuards(RolesGuard)
  @Roles(AppRole.Admin)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @UseGuards(RolesGuard)
  @Roles(AppRole.Admin)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles(AppRole.Admin)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRolDto,
  ) {
    return this.service.update(id, dto);
  }

  @UseGuards(RolesGuard)
  @Roles(AppRole.Admin)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
