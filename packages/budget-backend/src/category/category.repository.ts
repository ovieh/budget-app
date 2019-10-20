import { EntityRepository, Repository } from 'typeorm';
import { Category } from './category.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto } from '../transaction/DTO/create-category.dto';
import { User } from '../auth/user.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  private logger = new Logger('Cateogry Repository');

  async createCategory(
    createCategoryDto: CreateCategoryDto,
    user: User,
    ): Promise<Category> {
    const { name } = createCategoryDto;
    const category = new Category();
    category.name = name;
    category.user = user;
    await category.save();
    return category;
  }
}
