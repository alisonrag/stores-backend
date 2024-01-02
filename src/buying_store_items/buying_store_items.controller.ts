import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BuyingStoreItemsService } from './buying_store_items.service';
import { Prisma } from '@prisma/client';

@Controller('buying-store-items')
export class BuyingStoreItemsController {
  constructor(private readonly buyingStoreItemsService: BuyingStoreItemsService) { }

  @Post()
  create(@Body() createBuyingStoreItemDto: Prisma.BuyingStoreItemUncheckedCreateInput) {
    return this.buyingStoreItemsService.create(createBuyingStoreItemDto);
  }

  @Post("many")
  createMany(@Body() createVendingStoreItemDto: Prisma.BuyingStoreItemUncheckedCreateInput[]) {
    return this.buyingStoreItemsService.createMany(createVendingStoreItemDto);
  }

  @Get()
  findAll() {
    return this.buyingStoreItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buyingStoreItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBuyingStoreItemDto: Prisma.BuyingStoreItemUpdateInput) {
    return this.buyingStoreItemsService.update(+id, updateBuyingStoreItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buyingStoreItemsService.remove(+id);
  }

  @Get(':id/vending-store')
  findItemWithStores(@Param('id') id: string) {
    return this.buyingStoreItemsService.findItemWithStores(+id);
  }

  @Get('name/:name')
  findItemByName(@Param('name') name: string) {
    return this.buyingStoreItemsService.findItemByName(name);
  }
}
