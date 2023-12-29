import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BuyingStoresService } from './buying_stores.service';
import { Prisma } from '@prisma/client';

@Controller('buying-stores')
export class BuyingStoresController {
  constructor(private readonly buyingStoresService: BuyingStoresService) {}

  @Post()
  create(@Body() createBuyingStoreDto: Prisma.BuyingStoreCreateInput) {
    return this.buyingStoresService.create(createBuyingStoreDto);
  }

  @Get()
  findAll() {
    return this.buyingStoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buyingStoresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBuyingStoreDto: Prisma.BuyingStoreUpdateInput) {
    return this.buyingStoresService.update(+id, updateBuyingStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buyingStoresService.remove(+id);
  }
}
