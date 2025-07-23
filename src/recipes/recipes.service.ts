import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.RecipeCreateInput) {
    return this.prisma.recipe.create({ data });
  }

  async findAll() {
    return this.prisma.recipe.findMany({
      include: { user: true, ratings: true },
    });
  }

  async findByUser(userId: number) {
    return this.prisma.recipe.findMany({ where: { userId } });
  }

  async findOne(id: number) {
    return this.prisma.recipe.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.RecipeUpdateInput) {
    return this.prisma.recipe.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.recipe.delete({ where: { id } });
  }
}
