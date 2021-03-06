import { EntityRepository, Repository } from 'typeorm';
import { Category } from './category.entity';
import {
  Logger,
  BadRequestException,
} from '@nestjs/common';
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

  async getCategories(user: User): Promise<Category[]> {
    try {
      const categories = await this.find({
        relations: ['transactions'],
        where: { user: { id: user.id } },
      });
      return categories;
    } catch (error) {
      this.logger.error(
        `Failed to get categories for user "${user.username}".`,
        error.stack,
      );
    }
  }

  async getCategoryByDescription(
    description: string,
    user: User,
  ): Promise<Category> {
    const query = this.createQueryBuilder('category')
      .select('category')
      .leftJoinAndSelect('category.transactions', 'transactions')
      .where('transactions.userId = :userId', { userId: user.id })
      .andWhere('transactions.description = :description', {
        description,
      });


    try {
      const category = await query.getOne();
      return category;
    } catch (error) {
      this.logger.error(
        `Failed to get category for description "${description}".`,
        error.stack,
      );
      throw new BadRequestException();
    }


  }

  async removeCategoryById(id: number, user: User): Promise<void> {
    try {
      this.createQueryBuilder('category')
        .delete()
        .from('category')
        .where('category.id = :id', { id })
        .andWhere('"userId" = :userId', { userId: user.id })
        .execute();
    } catch (error) {
      this.logger.error(`Could not delete category with id: "${id}"`);
    }
  }

  async sumCategoryDebits(id: number, user: User): Promise<number> {
    const { sum } = await this.createQueryBuilder('category')
      .leftJoinAndSelect('category.transaction', 'transaction')
      .where('category.id = :id', { id })
      .andWhere('transaction.userId = :userId', { userId: user.id })
      .select('SUM(transaction.debitAmount)', 'sum')
      .cache(true)
      .getRawOne();

    return sum || 0;
  }

  async sumCategoryDebitsByYearMonth(
    id: number,
    user: User,
    year: number,
    month: number,
  ): Promise<number> {
    const { sum } = await this.createQueryBuilder('category')
      .leftJoinAndSelect('category.transactions', 'transaction')
      .where('category.id = :id', { id })
      .andWhere('transaction.userId = :userId', { userId: user.id })
      .andWhere(`EXTRACT(Year FROM transaction.date) = ${year}`)
      .andWhere(`EXTRACT(Month FROM transaction.date) = ${month}`)
      .select('SUM(transaction.debitAmount)', 'sum')
      // .cache(true)
      .getRawOne();
    return sum || 0;
  }
}
