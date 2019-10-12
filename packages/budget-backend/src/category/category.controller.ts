import { Controller, Logger, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';

@Controller('category')
export class CategoryController {
  private logger = new Logger('Category Controller');
  constructor(private categoryService: CategoryService) {}

  @Get()
  getCategories(): Promise<Category[]> {
    return this.categoryService.findAll();
  }
}
