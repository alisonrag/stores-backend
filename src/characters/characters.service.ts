import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Character } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CharactersService {
  constructor(private readonly databaseService: DatabaseService) { }

  async create(createCharacterDto: Prisma.CharacterCreateInput): Promise<Character> {
    try {
      return await this.databaseService.character.upsert({
        where: {
          name: createCharacterDto.name
        },
        update: {
          ...createCharacterDto
        },
        create: {
          ...createCharacterDto
        },
      });
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            character: 'failed to create character',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Character[]> {
    try {
      return await this.databaseService.character.findMany();
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            character: 'failed to list characters',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<Character> {
    const character = await this.databaseService.character.findUnique({
      where: { id, }
    })
    if (character)
      return character

    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        errors: {
          character: 'failed to find character',
        },
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, updateCharacterDto: Prisma.CharacterUpdateInput): Promise<Character> {
    try {
      return await this.databaseService.character.update({
        where: {
          id,
        },
        data: updateCharacterDto,
      })
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            character: 'failed to update character',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<Character> {
    try {
      return await this.databaseService.character.delete({
        where: {
          id,
        }
      })
    } catch (exception) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          errors: {
            character: 'failed to delete character',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
