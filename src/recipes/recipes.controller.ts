import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
  ValidationPipe,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @Body(new ValidationPipe()) createRecipeDto: CreateRecipeDto,
    @Request() req,
  ) {
    const userId = req.user.userId;
    return this.recipesService.create({
      ...createRecipeDto,
      user: { connect: { id: userId } },
    });
  }

  @Get()
  findAll() {
    return this.recipesService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('mine')
  findMy(@Request() req) {
    const userId = req.user.userId;
    return this.recipesService.findByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(Number(id));
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateRecipeDto: UpdateRecipeDto,
  ) {
    return this.recipesService.update(Number(id), updateRecipeDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipesService.delete(Number(id));
  }
}
