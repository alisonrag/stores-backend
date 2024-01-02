import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, BuyingStoreItem } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class BuyingStoreItemsService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createBuyingStoreItemDto: Prisma.BuyingStoreItemUncheckedCreateInput): Promise<BuyingStoreItem> {
    try {
      return await this.databaseService.buyingStoreItem.create({
        data: createBuyingStoreItemDto
      });
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            buyingStoreItem: 'failed to create buying store item',
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
            buyingStoreItem: 'failed to list buying store item',
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
          buyingStoreItem: 'failed to find buying store item',
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
            buyingStoreItem: 'failed to update buying store item',
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
            buyingStoreItem: 'failed to delete buying store item',
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

  async createMany(createBuyingStoreItemDto: Prisma.BuyingStoreItemUncheckedCreateInput[]) {
    try {
      return await this.databaseService.$transaction(
        createBuyingStoreItemDto.map((buyingStoreItem) => {
          return this.databaseService.buyingStoreItem.upsert({
            where: {
              character_id_name: {
                character_id: buyingStoreItem.character_id,
                name: buyingStoreItem.name
              }
            },
            update: { ...buyingStoreItem },
            create: { ...buyingStoreItem },
          });
        }))
    } catch (exception) {
      console.log(createBuyingStoreItemDto, exception)
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            buyingStoreItem: 'failed to create buying store item',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
