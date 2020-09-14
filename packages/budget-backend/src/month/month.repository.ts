import { EntityRepository, Repository } from 'typeorm';
import { Month } from './month.entity';
import { Logger, BadRequestException } from '@nestjs/common';
import { CreateMonthDto } from './DTO/create-month.dto';
import { UpdateMonthCategoriesDto } from './DTO/update-month-categories.dto';

@EntityRepository(Month)
export class MonthRepository extends Repository<Month> {
  private logger = new Logger('Month Repository');

  async createMonth(
    createMonthDto: CreateMonthDto,
    userId: number,
  ): Promise<Month> {
    const { month, year, transactions } = createMonthDto;

    const existingMonth = await this.findOne({ year, month, userId });

    if (existingMonth) {
      // take existing transactions and add new transactions
      existingMonth.transactions = [...existingMonth.transactions, ...transactions];

      await existingMonth.save();

      return existingMonth;
    }

    const newMonth = new Month();

    newMonth.year = year;
    newMonth.month = month;
    newMonth.userId = userId;

    if (transactions) {
      newMonth.transactions = transactions;
    } 

    try {
      await newMonth.save();
      this.logger.log('Created new month');
      return newMonth;
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException('could not create month');
    }
  }

  async updateMonthCategories(
    updateMonthCategoriesDto: UpdateMonthCategoriesDto,
    userId: number,
  ): Promise<Month> {
    const { categories, month } = updateMonthCategoriesDto;
    // TODO: figure out if this is a bad idea
    if (month.categories) {
      month.categories = [...month.categories, ...categories];
    } else {
      month.categories = categories;
    }

    await month.save();

    return month;
  }

}
