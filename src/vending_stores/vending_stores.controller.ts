import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VendingStoresService } from './vending_stores.service';
import { Prisma } from '@prisma/client';

@Controller('vending-stores')
export class VendingStoresController {
  constructor(private readonly vendingStoresService: VendingStoresService) {}

  @Post()
  create(@Body() createVendingStoreDto: Prisma.VendingStoreUncheckedCreateInput) {
    return this.vendingStoresService.create(createVendingStoreDto);
  }

  @Get()
  findAll() {
    return this.vendingStoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vendingStoresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVendingStoreDto: Prisma.VendingStoreUpdateInput) {
    return this.vendingStoresService.update(+id, updateVendingStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vendingStoresService.remove(+id);
  }
}
