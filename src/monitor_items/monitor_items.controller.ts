import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MonitorItemsService } from './monitor_items.service';
import { Prisma } from '@prisma/client';

@Controller('monitor-items')
export class MonitorItemsController {
  constructor(private readonly monitorItemsService: MonitorItemsService) {}

  @Post()
  create(@Body() createMonitorItemDto: Prisma.MonitorItemCreateInput) {
    return this.monitorItemsService.create(createMonitorItemDto);
  }

  @Get()
  findAll() {
    return this.monitorItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monitorItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMonitorItemDto: Prisma.MonitorItemUpdateInput) {
    return this.monitorItemsService.update(+id, updateMonitorItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.monitorItemsService.remove(+id);
  }
}
