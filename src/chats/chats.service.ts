import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Chat } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class ChatsService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createChatDto: Prisma.ChatCreateInput): Promise<Chat> {
    try {
      return await this.databaseService.chat.create({
        data: createChatDto
      });
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            chat: 'failed to create chat',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Chat[]> {
    try {
      return await this.databaseService.chat.findMany();
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            chat: 'failed to list chats',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<Chat> {
    const chat = await this.databaseService.chat.findUnique({
      where: { id, }
    })
    if (chat)
      return chat

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        errors: {
          chat: 'failed to find chat',
        },
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, updateChatDto: Prisma.ChatUpdateInput): Promise<Chat> {
    try {
      return await this.databaseService.chat.update({
        where: {
          id,
        },
        data: updateChatDto,
      })
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            chat: 'failed to update chat',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<Chat> {
    try {
      return await this.databaseService.chat.delete({
        where: {
          id,
        }
      })
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            chat: 'failed to delete chat',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
