import { EntityRepository, Repository } from 'typeorm';
import { Month } from './month.entity';
import { Logger, NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { CreateMonthDto } from './DTO/create-month.dto';
import { GetMonthByCategoryDto } from './DTO/get-month-by-category.dto';
import { UpdateCategoryDto } from 'src/category/DTO/update-category.dto';

@EntityRepository(Month)
export class MonthRepository extends Repository<Month> {
  private logger = new Logger('Month Repository');

  // Create Month
  async createMonth(
    createMonthDto: CreateMonthDto,

    user: User,
  ): Promise<Month> {
    const { month: monthDto, year, transaction, categories } = createMonthDto;
    const month = new Month();

    month.month = monthDto;
    month.year = year;
    month.userId = user.id;
    month.transactions = [transaction];
    month.categories = [transaction.category];

    try {
      await month.save();
      return month;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async updateMonthCategories(
    monthId: string,
    updateCategoryDto: UpdateCategoryDto,
    user: User,
  ): Promise<Month> {
    const month = await this.findOne(monthId, {
      where: { userId: user.id },
      relations: ['categories'],
    });

    if (!month) throw new NotFoundException('Month not found');

    const { categories } = updateCategoryDto;

    if (month.categories) {
      month.categories = [...month.categories, ...categories];
    } else {
      month.categories = categories;
    }

    await month.save();

    return month;
  }

  // get category by month
  async categoryByMonth(
    getMonthByCategoryDto: GetMonthByCategoryDto,
    user: User,
  ): Promise<Month[]> {
    const { month, year, categoryId } = getMonthByCategoryDto;

    return await this.createQueryBuilder('month')
      .leftJoinAndSelect('month.categories', 'category')
      .leftJoinAndSelect('category.transactions', 'transaction')
      .where('month.userId = :userId', { userId: user.id })
      .andWhere('month.month = :month', { month: month })
      .andWhere('month.year = :year', { year: year })
      .andWhere('category.id = :categoryId', { categoryId })
      .getMany();
  }
}
