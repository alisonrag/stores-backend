import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SearchLogsService } from './search_logs.service';
import { Prisma } from '@prisma/client';

@Controller('search-logs')
export class SearchLogsController {
  constructor(private readonly searchLogsService: SearchLogsService) {}

  @Post()
  create(@Body() createSearchLogDto: Prisma.SearchLogCreateInput) {
    return this.searchLogsService.create(createSearchLogDto);
  }

  @Get()
  findAll() {
    return this.searchLogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.searchLogsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSearchLogDto: Prisma.SearchLogUpdateInput) {
    return this.searchLogsService.update(+id, updateSearchLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.searchLogsService.remove(+id);
  }
}
