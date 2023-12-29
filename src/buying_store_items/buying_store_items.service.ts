import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, BuyingStoreItem } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class BuyingStoreItemsService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createBuyingStoreItemDto: Prisma.BuyingStoreItemCreateInput): Promise<BuyingStoreItem> {
    try {
      return await this.databaseService.buyingStoreItem.create({
        data: createBuyingStoreItemDto
      });
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            buyingStoreItem: 'failed to create buyingStoreItem',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<BuyingStoreItem[]> {
    try {
      return await this.databaseService.buyingStoreItem.findMany();
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            buyingStoreItem: 'failed to list buyingStoreItems',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<BuyingStoreItem> {
    const buyingStoreItem = await this.databaseService.buyingStoreItem.findUnique({
      where: { id, }
    })
    if (buyingStoreItem)
      return buyingStoreItem

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        errors: {
          buyingStoreItem: 'failed to find buyingStoreItem',
        },
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, updateBuyingStoreItemDto: Prisma.BuyingStoreItemUpdateInput): Promise<BuyingStoreItem> {
    try {
      return await this.databaseService.buyingStoreItem.update({
        where: {
          id,
        },
        data: updateBuyingStoreItemDto,
      })
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            buyingStoreItem: 'failed to update buyingStoreItem',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<BuyingStoreItem> {
    try {
      return await this.databaseService.buyingStoreItem.delete({
        where: {
          id,
        }
      })
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            buyingStoreItem: 'failed to delete buyingStoreItem',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findItemWithStores(item_id: number): Promise<any> {
    try {
      return await this.databaseService.buyingStoreItem.findMany({
        where: {
          item_id: {
            equals: item_id
          }
        },
        include: {
          buying_store: {}
        }
      })
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            buyingStoreItem: 'failed to list items with stores',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findItemByName(name: string): Promise<BuyingStoreItem[]> {
    try {
      return await this.databaseService.buyingStoreItem.findMany({
        where: {
          name: {
            contains: name
          }
        }
      })
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            buyingStoreItem: 'failed to list items',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
