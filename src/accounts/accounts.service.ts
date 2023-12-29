import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Account } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AccountsService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createAccountDto: Prisma.AccountCreateInput): Promise<Account> {
    try {
      return await this.databaseService.account.create({
        data: createAccountDto
      });
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            account: 'failed to create account',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this.databaseService.account.findMany();
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            account: 'failed to list accounts',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    const account = await this.databaseService.account.findUnique({
      where: { id, }
    })
    if (account)
      return account

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        errors: {
          account: 'failed to find account',
        },
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, updateAccountDto: Prisma.AccountUpdateInput) {
    try {
      return await this.databaseService.account.update({
        where: {
          id,
        },
        data: updateAccountDto,
      })
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            account: 'failed to update account',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.account.delete({
        where: {
          id,
        }
      })
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            account: 'failed to delete account',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
