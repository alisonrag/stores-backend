import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createUserDto: Prisma.UserCreateInput): Promise<User> {
    try {
      return await this.databaseService.user.create({
        data: createUserDto
      });
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            user: 'failed to create user',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.databaseService.user.findMany();
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            user: 'failed to list users',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<User> {
    const user = await this.databaseService.user.findUnique({
      where: { id, }
    })
    if (user)
      return user

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        errors: {
          user: 'failed to find user',
        },
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput): Promise<User> {
    try {
      return await this.databaseService.user.update({
        where: {
          id,
        },
        data: updateUserDto,
      })
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            user: 'failed to update user',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<User> {
    try {
      return await this.databaseService.user.delete({
        where: {
          id,
        }
      })
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            user: 'failed to delete user',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
