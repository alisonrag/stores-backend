import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatisticItemsService } from './statistic_items.service';
import { Prisma } from '@prisma/client';

@Controller('statistic-items')
export class StatisticItemsController {
  constructor(private readonly statisticItemsService: StatisticItemsService) {}

  @Post()
  create(@Body() createStatisticItemDto: Prisma.StatisticItemCreateInput) {
    return this.statisticItemsService.create(createStatisticItemDto);
  }

  @Get()
  findAll() {
    return this.statisticItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statisticItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatisticItemDto: Prisma.StatisticItemUpdateInput) {
    return this.statisticItemsService.update(+id, updateStatisticItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statisticItemsService.remove(+id);
  }
}
