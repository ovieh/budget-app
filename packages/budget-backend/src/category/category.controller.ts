import { Controller, Logger, Get, Post, Param, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Transaction } from '../transaction/transaction.entity';
import { Category } from './category.entity';
import { User } from '../auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';

@Controller('category')
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

}
