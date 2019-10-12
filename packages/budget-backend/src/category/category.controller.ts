import { Controller, Logger, Get, Post, Param, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Transaction } from '../transaction/transaction.entity';
import { Category } from './category.entity';

@Controller('category')
export class CategoryController {
  private logger = new Logger('Category Controller');
  constructor(private categoryService: CategoryService) {}

  @Get()
  getCategories(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get('/:id')
  getTransactionsByCategory(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }

}
