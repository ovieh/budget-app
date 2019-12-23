import { EntityRepository, Repository, Transaction } from 'typeorm';
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
    const { name, budget } = createCategoryDto;
    const category = new Category();
    category.name = name;
    category.user = user;
    category.budget = budget;
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

    const query = this.createQueryBuilder('category')
      .select('category')
      .leftJoinAndSelect('category.transaction', 'transaction')
      .where('transaction.userId = :userId', {userId: user.id})
      .andWhere('transaction.transactionDescription = :description', {description});

    try {
      const categories = await query.getOne();
      return categories;

    } catch (error) {
        this.logger.error(`Failed to get category for description "${description}".`, error.stack);
        throw new BadRequestException();
    }
  }

  async removeCategoryById(
    id: number,
    user: User,
  ): Promise<void> {

    try {
      this.createQueryBuilder('category')
        .delete()
        .from('category')
        .where('category.id = :id', {id})
        .andWhere('"userId" = :userId', {userId: user.id })
        .execute();
    } catch (error) {
      this.logger.error(`Could not delete category with id: "${id}"`);

    }

  }

  // async sumCategoryDebits(
  //   id: number,
  //   user: User,
  // ): Promise<number> {
  //   const { sum } = await this.createQueryBuilder('category')
  //     .leftJoinAndSelect('category.transaction', 'transaction')
  //     .where('transaction.id = :id', {id})
  //     .select('SUM(transaction.debitAmount)', 'sum')
  //     .where('transaction.userId = :userId', {userId: user.id})
  //     .getRawOne();

  //   return sum;

  // }
}
