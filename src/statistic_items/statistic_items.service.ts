import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, StatisticItem } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class StatisticItemsService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createStatisticItemDto: Prisma.StatisticItemCreateInput): Promise<StatisticItem> {
    try {
      return await this.databaseService.statisticItem.create({
        data: createStatisticItemDto
      });
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            statisticItem: 'failed to create statisticItem',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<StatisticItem[]> {
    try {
      return await this.databaseService.statisticItem.findMany();
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            statisticItem: 'failed to list statisticItems',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<StatisticItem> {
    const statisticItem = await this.databaseService.statisticItem.findUnique({
      where: { id, }
    })
    if (statisticItem)
      return statisticItem

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        errors: {
          statisticItem: 'failed to find statisticItem',
        },
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, updateStatisticItemDto: Prisma.StatisticItemUpdateInput): Promise<StatisticItem> {
    try {
      return await this.databaseService.statisticItem.update({
        where: {
          id,
        },
        data: updateStatisticItemDto,
      })
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            statisticItem: 'failed to update statisticItem',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<StatisticItem> {
    try {
      return await this.databaseService.statisticItem.delete({
        where: {
          id,
        }
      })
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            statisticItem: 'failed to delete statisticItem',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
