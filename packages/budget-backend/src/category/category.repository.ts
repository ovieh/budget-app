import { EntityRepository, Repository } from 'typeorm';
import { Category } from './category.entity';
import { Logger, InternalServerErrorException, BadRequestException } from '@nestjs/common';
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
    try {
      await category.save();
      delete category.user;
      return category;
    } catch (error) {
      if (error.code === '23505') {
        this.logger.error(`Category ${name} aleady exists!`);
      }
    }

  }

  async getCategories(
    user: User,
  ): Promise<Category[]> {

    const query = this.createQueryBuilder('category');
    // Add quotes around column name 😢
    query.where('"userId" = :userId', {userId: user.id });

    try {
      const categories = await query.getMany();
      return categories;

    } catch (error) {
        this.logger.error(`Failed to get tasks for user "${user.username}".`, error.stack);
        throw new BadRequestException();
    }
  }

  async getCategoryByDescription(
    description: string,
    user: User,
  ): Promise<Category> {
    try {
      const found = await this.createQueryBuilder('category')
        .select('category')
        // .where('category.userId = :userId', {userId: user.id})
        .getOne();
      return found;
    } catch (error) {
      this.logger.error(`Could not find description by "${description}"`);
      throw new InternalServerErrorException();

    }
  }

}
