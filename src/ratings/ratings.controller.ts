import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Param,
  Get,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateRatingDto } from './dto/create-rating.dto';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createOrUpdate(@Body() dto: CreateRatingDto, @Request() req) {
    const userId = req.user.userId;
    return this.ratingsService.createOrUpdate(userId, dto);
  }

  @Get('recipe/:id')
  findByRecipe(@Param('id', ParseIntPipe) id: number) {
    return this.ratingsService.findByRecipe(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('recipe/:id')
  delete(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const userId = req.user.userId;
    return this.ratingsService.delete(userId, id);
  }
}
