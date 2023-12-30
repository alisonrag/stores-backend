import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, VendingStore } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class VendingStoresService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createVendingStoreDto: Prisma.VendingStoreUncheckedCreateInput): Promise<VendingStore> {
    try {
      return await this.databaseService.vendingStore.upsert({
        where: {
          character_id: createVendingStoreDto.character_id
        },
        update: {
          ...createVendingStoreDto
        },
        create: {
          ...createVendingStoreDto
        },
      });
    } catch (exception) {
      console.log(createVendingStoreDto, exception)
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            vendingStore: 'failed to create vendingStore',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<VendingStore[]> {
    try {
      return await this.databaseService.vendingStore.findMany();
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            vendingStore: 'failed to list vendingStores',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<VendingStore> {
    const vendingStore = await this.databaseService.vendingStore.findUnique({
      where: { id, }
    })
    if (vendingStore)
      return vendingStore

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        errors: {
          vendingStore: 'failed to find vendingStore',
        },
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, updateVendingStoreDto: Prisma.VendingStoreUpdateInput): Promise<VendingStore> {
    try {
      return await this.databaseService.vendingStore.update({
        where: {
          id,
        },
        data: updateVendingStoreDto,
      })
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            vendingStore: 'failed to update vendingStore',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<VendingStore> {
    try {
      return await this.databaseService.vendingStore.delete({
        where: {
          id,
        }
      })
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            vendingStore: 'failed to delete vendingStore',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
