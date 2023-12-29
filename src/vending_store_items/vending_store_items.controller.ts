import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VendingStoreItemsService } from './vending_store_items.service';
import { Prisma } from '@prisma/client';

@Controller('vending-store-items')
export class VendingStoreItemsController {
  constructor(private readonly vendingStoreItemsService: VendingStoreItemsService) { }

  @Post()
  create(@Body() createVendingStoreItemDto: Prisma.VendingStoreItemCreateInput) {
    return this.vendingStoreItemsService.create(createVendingStoreItemDto);
  }

  @Get()
  findAll() {
    return this.vendingStoreItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vendingStoreItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVendingStoreItemDto: Prisma.VendingStoreItemUpdateInput) {
    return this.vendingStoreItemsService.update(+id, updateVendingStoreItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vendingStoreItemsService.remove(+id);
  }

  @Get(':id/vending-store')
  findItemWithStores(@Param('id') id: string) {
    return this.vendingStoreItemsService.findItemWithStores(+id);
  }

  @Get('name/:name')
  findItemByName(@Param('name') name: string) {
    return this.vendingStoreItemsService.findItemByName(name);
  }
}
