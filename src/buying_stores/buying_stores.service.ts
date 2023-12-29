import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, BuyingStore } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class BuyingStoresService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createBuyingStoreDto: Prisma.BuyingStoreCreateInput): Promise<BuyingStore> {
    try {
      return await this.databaseService.buyingStore.create({
        data: createBuyingStoreDto
      });
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            buyingStore: 'failed to create buyingStore',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<BuyingStore[]> {
    try {
      return await this.databaseService.buyingStore.findMany();
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            buyingStore: 'failed to list buyingStores',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<BuyingStore> {
    const buyingStore = await this.databaseService.buyingStore.findUnique({
      where: { id, }
    })
    if (buyingStore)
      return buyingStore

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        errors: {
          buyingStore: 'failed to find buyingStore',
        },
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, updateBuyingStoreDto: Prisma.BuyingStoreUpdateInput): Promise<BuyingStore> {
    try {
      return await this.databaseService.buyingStore.update({
        where: {
          id,
        },
        data: updateBuyingStoreDto,
      })
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            buyingStore: 'failed to update buyingStore',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<BuyingStore> {
    try {
      return await this.databaseService.buyingStore.delete({
        where: {
          id,
        }
      })
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            buyingStore: 'failed to delete buyingStore',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
