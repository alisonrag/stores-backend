import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UpdateTimesService } from './update_times.service';
import { Prisma } from '@prisma/client';

@Controller('update-times')
export class UpdateTimesController {
  constructor(private readonly updateTimesService: UpdateTimesService) {}

  @Post()
  create(@Body() createUpdateTimeDto: Prisma.UpdateTimeCreateInput) {
    return this.updateTimesService.create(createUpdateTimeDto);
  }

  @Get()
  findAll() {
    return this.updateTimesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.updateTimesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUpdateTimeDto:  Prisma.UpdateTimeUpdateInput) {
    return this.updateTimesService.update(+id, updateUpdateTimeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.updateTimesService.remove(+id);
  }
}
