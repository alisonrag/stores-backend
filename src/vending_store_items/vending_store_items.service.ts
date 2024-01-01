import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, VendingStoreItem } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class VendingStoreItemsService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createVendingStoreItemDto: Prisma.VendingStoreItemUncheckedCreateInput): Promise<VendingStoreItem> {
    try {
      return await this.databaseService.vendingStoreItem.upsert({
        where: {
          character_id_name: {
            character_id: createVendingStoreItemDto.character_id,
            name: createVendingStoreItemDto.name
          }
        },
        update: {
          ...createVendingStoreItemDto
        },
        create: {
          ...createVendingStoreItemDto
        },
      });
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            vendingStoreItem: 'failed to create vendingStoreItem',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<VendingStoreItem[]> {
    try {
      return await this.databaseService.vendingStoreItem.findMany();
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            vendingStoreItem: 'failed to list vendingStoreItems',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<VendingStoreItem> {
    const vendingStoreItem = await this.databaseService.vendingStoreItem.findUnique({
      where: { id, }
    })
    if (vendingStoreItem)
      return vendingStoreItem

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        errors: {
          vendingStoreItem: 'failed to find vendingStoreItem',
        },
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, updateVendingStoreItemDto: Prisma.VendingStoreItemUpdateInput): Promise<VendingStoreItem> {
    try {
      return await this.databaseService.vendingStoreItem.update({
        where: {
          id,
        },
        data: updateVendingStoreItemDto,
      })
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            vendingStoreItem: 'failed to update vendingStoreItem',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<VendingStoreItem> {
    try {
      return await this.databaseService.vendingStoreItem.delete({
        where: {
          id,
        }
      })
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            vendingStoreItem: 'failed to delete vendingStoreItem',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findItemWithStores(item_id: number): Promise<any> {
    try {
      return await this.databaseService.vendingStoreItem.findMany({
        where: {
          item_id: {
            equals: item_id
          }
        },
        include: {
          vending_store: {}
        }
      })
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            vendingStoreItem: 'failed to list items with stores',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findItemByName(name: string): Promise<VendingStoreItem[]> {
    try {
      return await this.databaseService.vendingStoreItem.findMany({
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
            vendingStoreItem: 'failed to list items',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createMany(createVendingStoreItemDto: Prisma.VendingStoreItemUncheckedCreateInput[]) {
    try {
      return await this.databaseService.$transaction(
        createVendingStoreItemDto.map((vendingStoreItem) => {
          return this.databaseService.vendingStoreItem.upsert({
            where: {
              character_id_name: {
                character_id: vendingStoreItem.character_id,
                name: vendingStoreItem.name
              }
            },
            update: { ...vendingStoreItem },
            create: { ...vendingStoreItem },
          });
        }))
    } catch (exception) {
      console.log(createVendingStoreItemDto, exception)
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            vendingStoreItem: 'failed to create vendingStoreItem',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
