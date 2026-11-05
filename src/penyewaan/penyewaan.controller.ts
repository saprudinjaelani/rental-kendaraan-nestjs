import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PenyewaanService } from './penyewaan.service';
import { CreatePenyewaanDto } from './dto/create-penyewaan.dto';

@Controller('penyewaan')
export class PenyewaanController {
  constructor(private readonly penyewaanService: PenyewaanService) {}

  @Post()
  create(@Body() createPenyewaanDto: CreatePenyewaanDto) {
    return this.penyewaanService.create(createPenyewaanDto);
  }

  @Get()
  findAll() {
    return this.penyewaanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.penyewaanService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.penyewaanService.remove(id);
  }
}
