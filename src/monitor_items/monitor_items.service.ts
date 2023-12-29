import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, MonitorItem } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class MonitorItemsService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createMonitorItemDto: Prisma.MonitorItemCreateInput): Promise<MonitorItem> {
    try {
      return await this.databaseService.monitorItem.create({
        data: createMonitorItemDto
      });
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            monitorItem: 'failed to create monitorItem',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<MonitorItem[]> {
    try {
      return await this.databaseService.monitorItem.findMany();
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            monitorItem: 'failed to list monitorItems',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<MonitorItem> {
    const monitorItem = await this.databaseService.monitorItem.findUnique({
      where: { id, }
    })
    if (monitorItem)
      return monitorItem

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        errors: {
          monitorItem: 'failed to find monitorItem',
        },
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, updateMonitorItemDto: Prisma.MonitorItemUpdateInput): Promise<MonitorItem> {
    try {
      return await this.databaseService.monitorItem.update({
        where: {
          id,
        },
        data: updateMonitorItemDto,
      })
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            monitorItem: 'failed to update monitorItem',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<MonitorItem> {
    try {
      return await this.databaseService.monitorItem.delete({
        where: {
          id,
        }
      })
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            monitorItem: 'failed to delete monitorItem',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

