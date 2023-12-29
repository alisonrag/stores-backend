import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, UpdateTime } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UpdateTimesService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createUpdateTimeDto: Prisma.UpdateTimeCreateInput): Promise<UpdateTime> {
    try {
      return await this.databaseService.updateTime.create({
        data: createUpdateTimeDto
      });
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            updateTime: 'failed to create updateTime',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<UpdateTime[]> {
    try {
      return await this.databaseService.updateTime.findMany();
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            updateTime: 'failed to list updateTimes',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<UpdateTime> {
    const updateTime = await this.databaseService.updateTime.findUnique({
      where: { id, }
    })
    if (updateTime)
      return updateTime

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        errors: {
          updateTime: 'failed to find updateTime',
        },
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, updateUpdateTimeDto: Prisma.UpdateTimeUpdateInput): Promise<UpdateTime> {
    try {
      return await this.databaseService.updateTime.update({
        where: {
          id,
        },
        data: updateUpdateTimeDto,
      })
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            updateTime: 'failed to update updateTime',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<UpdateTime> {
    try {
      return await this.databaseService.updateTime.delete({
        where: {
          id,
        }
      })
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            updateTime: 'failed to delete updateTime',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
