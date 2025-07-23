import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';

@Injectable()
export class RatingsService {
  constructor(private prisma: PrismaService) {}

  async createOrUpdate(userId: number, dto: CreateRatingDto) {
    // Проверим, есть ли уже рейтинг от этого пользователя на этот рецепт
    const existingRating = await this.prisma.rating.findUnique({
      where: {
        userId_recipeId: {
          userId,
          recipeId: dto.recipeId,
        },
      },
    });

    if (existingRating) {
      // Обновим рейтинг
      return this.prisma.rating.update({
        where: { id: existingRating.id },
        data: { stars: dto.stars },
      });
    }

    // Создадим новый рейтинг
    return this.prisma.rating.create({
      data: {
        stars: dto.stars,
        user: { connect: { id: userId } },
        recipe: { connect: { id: dto.recipeId } },
      },
    });
  }

  async findByRecipe(recipeId: number) {
    return this.prisma.rating.findMany({
      where: { recipeId },
    });
  }

  async delete(userId: number, recipeId: number) {
    const rating = await this.prisma.rating.findUnique({
      where: {
        userId_recipeId: {
          userId,
          recipeId,
        },
      },
    });

    if (!rating) {
      throw new NotFoundException('Rating not found');
    }

    return this.prisma.rating.delete({ where: { id: rating.id } });
  }
}
