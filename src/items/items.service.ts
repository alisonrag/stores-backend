import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Item } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ItemsService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createItemDto: Prisma.ItemCreateInput): Promise<Item> {
    try {
      return await this.databaseService.item.create({
        data: createItemDto
      });
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            item: 'failed to create item',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Item[]> {
    try {
      return await this.databaseService.item.findMany();
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            item: 'failed to list items',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<Item> {
    const item = await this.databaseService.item.findUnique({
      where: { id, }
    })
    if (item)
      return item

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        errors: {
          item: 'failed to find item',
        },
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, updateItemDto: Prisma.ItemUpdateInput): Promise<Item> {
    try {
      return await this.databaseService.item.update({
        where: {
          id,
        },
        data: updateItemDto,
      })
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            item: 'failed to update item',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<Item> {
    try {
      return await this.databaseService.item.delete({
        where: {
          id,
        }
      })
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            item: 'failed to delete item',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

