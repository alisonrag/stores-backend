import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipmentItemsService } from './equipment_items.service';
import { Prisma } from '@prisma/client';

@Controller('equipment-items')
export class EquipmentItemsController {
  constructor(private readonly equipmentItemsService: EquipmentItemsService) {}

  @Post()
  create(@Body() createEquipmentItemDto: Prisma.EquipmentItemCreateInput) {
    return this.equipmentItemsService.create(createEquipmentItemDto);
  }

  @Post("many")
  createMany(@Body() createVendingStoreItemDto: Prisma.EquipmentItemUncheckedCreateInput[]) {
    return this.equipmentItemsService.createMany(createVendingStoreItemDto);
  }

  @Get()
  findAll() {
    return this.equipmentItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipmentItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipmentItemDto: Prisma.EquipmentItemUpdateInput) {
    return this.equipmentItemsService.update(+id, updateEquipmentItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipmentItemsService.remove(+id);
  }

  @Get(':id/chat')
  findItemWithStores(@Param('id') id: string) {
    return this.equipmentItemsService.findItemWithStores(+id);
  }

  @Get('name/:name')
  findItemByName(@Param('name') name: string) {
    return this.equipmentItemsService.findItemByName(name);
  }
}
