import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, SearchLog } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SearchLogsService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createSearchLogDto: Prisma.SearchLogCreateInput): Promise<SearchLog> {
    try {
      return await this.databaseService.searchLog.create({
        data: createSearchLogDto
      });
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            searchLog: 'failed to create searchLog',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<SearchLog[]> {
    try {
      return await this.databaseService.searchLog.findMany();
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            searchLog: 'failed to list searchLogs',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<SearchLog> {
    const searchLog = await this.databaseService.searchLog.findUnique({
      where: { id, }
    })
    if (searchLog)
      return searchLog

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        errors: {
          searchLog: 'failed to find searchLog',
        },
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, updateSearchLogDto: Prisma.SearchLogUpdateInput): Promise<SearchLog> {
    try {
      return await this.databaseService.searchLog.update({
        where: {
          id,
        },
        data: updateSearchLogDto,
      })
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            searchLog: 'failed to update searchLog',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<SearchLog> {
    try {
      return await this.databaseService.searchLog.delete({
        where: {
          id,
        }
      })
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            searchLog: 'failed to delete searchLog',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
