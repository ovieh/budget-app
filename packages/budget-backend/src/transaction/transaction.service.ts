import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { TransactionRepository } from './transaction.repository';
import { Transaction } from './transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransactionDto } from './DTO/create-transaction.dto';
import { User } from '../auth/user.entity';
import { CategoryInput } from '../category/category.input';
import { YearMonth } from './DTO/year-month.dto';
import { CategoryService } from '../category/category.service';
import { MonthService } from 'src/month/month.service';
import { AddMonthToTransaction } from 'src/utils/add-month-to-transaction';
import { GetMonthByCategoryDto } from 'src/month/DTO/get-month-by-category.dto';

@Injectable()
export class TransactionService {
  private logger = new Logger('TransactionService');

  constructor(
    @InjectRepository(TransactionRepository)
    private transactionRepository: TransactionRepository,
    private categoryService: CategoryService,
    private monthService: MonthService,
  ) {}

  async findByIds(ids: string[]): Promise<Transaction[]> {
    return await this.transactionRepository.findByIds(ids);
  }

  async getTransaction(user: User): Promise<Transaction[]> {
    return await this.transactionRepository.find({ userId: user.id });
  }

  async findAll(): Promise<Transaction[]> {
    return await this.transactionRepository.find();
  }

  async getTransactionsById(id: string, user: User): Promise<Transaction> {
    const found = await this.transactionRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!found) {
      throw new NotFoundException(`Transaction with ID ${id} is not found`);
    }
    return found;
  }

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
    user: User,
  ): Promise<Transaction> {
    const transaction = await this.transactionRepository.createTransaction(
      createTransactionDto,
      user,
    );

    const category = await this.categoryService.getCategoryByDescription(
      transaction.description,
      user,
    );
    if (category && category.name !== 'Uncategorized') {
      transaction.category = category;
      this.logger.log(
        `Updated transaction category with new category: ${category.name}`,
      );
    } else {
      const category = await this.categoryService.findByName(
        'Uncategorized',
        user,
      );
      this.logger.log(
        `Updated transaction category with default: ${category.name}`,
      );
      transaction.category = category;
    }

    const date = AddMonthToTransaction(transaction, category);

    // Check if month exists for given date, if so, add month to that date
    const previousMonth = await this.monthService.getMonthByDate(date, user);

    if (previousMonth) {
      transaction.month = previousMonth;
      await this.monthService.updateMonthCategories(
        previousMonth.id,
        { categories: [category] },
        user,
      );
    } else {
      // If not, create new month
      const newMonth = await this.monthService.createMonth(date, user);
      if (!newMonth)
        throw new BadRequestException('Could not create new month');
      transaction.month = newMonth;
    }

    await transaction.save();

    return transaction;
  }

  async deleteTransactionById(id: string, user: User): Promise<void> {
    const result = await this.transactionRepository.delete({
      id,
      userId: user.id,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`No id with "${id}" found!`);
    }
  }
  async updateCategoryById(
    id: string,
    categoryId: number,
    user: User,
  ): Promise<Transaction> {
    try {
      const result = await this.transactionRepository.updateCategoryById(
        id,
        categoryId,
        user,
      );

      const updatedMonth = await this.monthService.updateMonthCategories(
        result.month.id,
        {
          categories: [result.category],
        },
        user,
      );
      this.logger.log(`Updated month: ${updatedMonth}`);
      return result;
    } catch {
      throw new InternalServerErrorException(
        `Could not update transaction with id ${id}`,
      );
    }
  }

  async updateCategoryByIds(
    ids: string[],
    categoryInput: CategoryInput,
    user: User,
  ): Promise<string> {
    // TODO: Fix this
    const category = JSON.parse(JSON.stringify(categoryInput));

    try {
      this.transactionRepository.updateCategoryByIds(ids, category.id, user);
    } catch (error) {
      throw new InternalServerErrorException(
        `Could not update transaction with id ${ids}`,
      );
    }
    return `Updated category for transaction with id ${ids}`;
  }

  async getTransactionsByMonth(
    month: number,
    user: User,
  ): Promise<Transaction[]> {
    return await this.transactionRepository.getTransactionsByMonth(month, user);
  }

  async getTransactionsByYearAndMonth(
    year: number,
    month: number,
    user: User,
    // skip: number,
    // take: number,
  ): Promise<Transaction[]> {
    return await this.transactionRepository.getTransactionsByYearAndMonth(
      year,
      month,
      user,
      // skip,
      // take,
    );
  }

  async getCreditsByYearAndMonth(
    year: number,
    month: number,
    user: User,
  ): Promise<Transaction[]> {
    return await this.transactionRepository.getCreditsByYearAndMonth(
      year,
      month,
      user,
    );
  }

  async getDebitsByYearAndMonth(
    year: number,
    month: number,
    user: User,
  ): Promise<Transaction[]> {
    return await this.transactionRepository.getDebitsByYearAndMonth(
      year,
      month,
      user,
    );
  }

  async getYearMonth(user: User): Promise<YearMonth[]> {
    return await this.transactionRepository.getYearMonth(user);
  }

  async sumDebitsByYearMonth(
    user: User,
    year: number,
    month: number,
  ): Promise<number> {
    return this.transactionRepository.sumDebitsByYearMonth(user, year, month);
  }

  async transactionsByMonthAndCateogry(
    getMonthByCategoryDto: GetMonthByCategoryDto,
    user: User,
  ) {
    return this.transactionRepository.transactionsByMonthAndCategory(
      getMonthByCategoryDto,
      user,
     );
  }
}
