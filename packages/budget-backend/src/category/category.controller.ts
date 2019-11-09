import { Controller, Logger, Get, Post, Param, ParseIntPipe, Body, UseGuards, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Transaction } from '../transaction/transaction.entity';
import { Category } from './category.entity';
import { User } from '../auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';

@Controller('category')
@UseGuards(AuthGuard())
export class CategoryController {
  private logger = new Logger('Category Controller');
  constructor(private categoryService: CategoryService) {}

  @Get()
  getCategories(
    @GetUser() user: User,
  ): Promise<Category[]> {
    return this.categoryService.findAll(user);
  }

  @Get('/:id')
  getTransactionsByCategory(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Category> {
    return this.categoryService.getCategoryById(id, user);
  }

  @Delete('/:id')
  removeCategoryById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.categoryService.removeCategoryById(id, user);
  }

  @Post('/description')
  getCategoryByDescription(
    @GetUser() user: User,
    @Body('description') description: string,
  ): Promise<Category> {
    return this.categoryService.getCategoryByDescription(description, user);
  }

}
