import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, EquipmentItem } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EquipmentItemsService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createEquipmentItemDto: Prisma.EquipmentItemCreateInput): Promise<EquipmentItem> {
    try {
      return await this.databaseService.equipmentItem.create({
        data: createEquipmentItemDto
      });
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            equipmentItem: 'failed to create equipmentItem',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<EquipmentItem[]> {
    try {
      return await this.databaseService.equipmentItem.findMany();
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            equipmentItem: 'failed to list equipmentItems',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<EquipmentItem> {
    const equipmentItem = await this.databaseService.equipmentItem.findUnique({
      where: { id, }
    })
    if (equipmentItem)
      return equipmentItem

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        errors: {
          equipmentItem: 'failed to find equipmentItem',
        },
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, updateEquipmentItemDto: Prisma.EquipmentItemUpdateInput): Promise<EquipmentItem> {
    try {
      return await this.databaseService.equipmentItem.update({
        where: {
          id,
        },
        data: updateEquipmentItemDto,
      })
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            equipmentItem: 'failed to update equipmentItem',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<EquipmentItem> {
    try {
      return await this.databaseService.equipmentItem.delete({
        where: {
          id,
        }
      })
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            equipmentItem: 'failed to delete equipmentItem',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findItemWithStores(item_id: number): Promise<any> {
    try {
      return await this.databaseService.equipmentItem.findMany({
        where: {
          item_id: {
            equals: item_id
          }
        },
        include: {
          chat: {}
        }
      })
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            equipmentItem: 'failed to list items with chats',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findItemByName(name: string): Promise<EquipmentItem[]> {
    try {
      return await this.databaseService.equipmentItem.findMany({
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
            equipmentItem: 'failed to list equipment items',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

