import { EntityRepository, Repository } from 'typeorm';
import { Month } from './month.entity';
import { Logger } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { CreateMonthDto } from './DTO/create-month.dto';
import { GetMonthByCategoryDto } from './DTO/get-month-by-category.dto';

@EntityRepository(Month)
export class MonthRepository extends Repository<Month> {
  private logger = new Logger('Month Repository');

  // Create Month
  async createMonth(
    createMonthDto: CreateMonthDto,

    user: User,
  ): Promise<Month> {
    const { month: monthDto, year, transaction, category } = createMonthDto;

    const month = new Month();

    month.month = monthDto;
    month.year = year;
    month.userId = user.id;
    month.transactions = [transaction];
    month.date = new Date(transaction.date);
    month.categories = category;

    try {
      await month.save();
      return month;
    } catch (error) {
      this.logger.error(error);
    }
  }

  // get category by month
  async categoryByMonth(
    getMonthByCategoryDto: GetMonthByCategoryDto,
    user: User,
  ): Promise<Month[]> {
    const { month, year, categoryId } = getMonthByCategoryDto;

      return this.createQueryBuilder('month')
        .leftJoinAndSelect('month.categories', 'category')
        .leftJoinAndSelect('month.transactions', 'transactions')
        .where('month.userId = :userId', { userId: user.id })
        .andWhere('month.month = :month', { month: month })
        .andWhere('month.year = :year', { year: year })
        .andWhere('category.id = :categoryId', { categoryId })
        .getMany();

    // return this.find({
    //   join: {
    //     alias: 'month',
    //     leftJoinAndSelect: {
    //       transactions: 'month.transactions',
    //       categories: 'month.categories',
    //     },
    //   },
    //   where: { userId: user.id, month, year},
    // });
  }
}
