import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { TransactionRepository } from './transaction.repository';
import { Transaction } from './transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransactionDto } from './DTO/create-transaction.dto';
import { User } from '../auth/user.entity';
import { CategoryInput } from '../category/category.input';
import { YearMonth } from './DTO/year-month.dto';
import { CategoryService } from '../category/category.service';
import { MonthService } from '../month/month.service';
import { GetMonthByCategoryDto } from '../month/DTO/get-month-by-category.dto';
import { TransactionDescriptionService } from '../transaction-description/transaction-description.service';
import { getMonthsFromTransactions } from '../utils/get-months-from-transaction';
import { Month } from '../month/month.entity';
import { SyncStrategy } from './sync-strategy.enum';
import { DateDto } from '../month/DTO/date.dto';

@Injectable()
export class TransactionService {
  private logger = new Logger('TransactionService');

  constructor(
    @InjectRepository(TransactionRepository)
    private transactionRepository: TransactionRepository,
    private categoryService: CategoryService,
    private monthService: MonthService,
    private transactionDescriptionService: TransactionDescriptionService,
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
    const updatedTransaction = await this.syncCategory(transaction, user);
    const transactionWithDescription = await this.syncDescription(
      updatedTransaction,
      SyncStrategy.Individual,
    );

    console.log(transactionWithDescription);
    const transactionWithMonth = await this.syncMonth(
      transactionWithDescription,
    );

    await transactionWithMonth.save();
    return transactionWithMonth;
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
      const transaction = await this.transactionRepository.updateCategoryById(
        id,
        categoryId,
        user,
      );

      await this.transactionDescriptionService.updateTransactionDescription(
        {
          categoryId,
          description: transaction.description,
        },
        user,
      );

      const updatedMonth = await this.monthService.updateMonthCategories(
        {
          categories: [transaction.category],
          month: transaction.month,
        },
        user.id,
      );

      return transaction;
    } catch (error) {
      this.logger.error(error.message);
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
  ): Promise<Transaction[]> {
    return this.transactionRepository.transactionsByMonthAndCategory(
      getMonthByCategoryDto,
      user,
    );
  }

  async syncCategory(
    transaction: Transaction,
    user: User,
  ): Promise<Transaction> {
    if (transaction.category) {
      return transaction;
    }

    const uncategorized = await this.categoryService.findByName(
      'Uncategorized',
      user.id,
    );

    if (!uncategorized)
      throw new InternalServerErrorException(
        `Could not find uncategorized category`,
      );

    transaction.category = uncategorized;

    return transaction;
  }

  async syncMonth(transaction: Transaction): Promise<Transaction> {
    const transactionMonth = getMonthsFromTransactions(
      [transaction],
      transaction.userId,
    )[0];

    const month = await this.monthService.getMonthByDate(
      {
        month: transactionMonth.month,
        year: transactionMonth.year,
      },
      transaction.userId,
    );

    if (month) {
      transaction.month = month;
      return transaction;
    } else {
      const month = new Month();
      month.transactions = [transaction];
      month.userId = transaction.userId;
      month.month = transactionMonth.month;
      month.year = transactionMonth.year;

      await month.save();
      this.logger.log(`Created new month ${month.month}/${month.year}`);
      transaction.month = month;
      return transaction;
    }
  }

  async syncDescription(
    transaction: Transaction,
    strategy: SyncStrategy,
  ): Promise<Transaction> {
    // find existing description
    const existingDescription = await this.transactionDescriptionService.findTransactionDescription(
      transaction.description,
      transaction.userId,
    );

    if (!existingDescription) {
      if (strategy === SyncStrategy.Individual) {
        await this.transactionDescriptionService.createTransactionDescription(
          {
            categoryId: transaction.category.id,
            description: transaction.description,
          },
          transaction.userId,
        );
        return transaction;
      } else if (strategy === SyncStrategy.Bulk) {
        const category = await this.categoryService.findByName(
          'Uncategorized',
          transaction.userId,
        );
        transaction.category = category;
        return transaction;
      }
    } else {
      transaction.category = existingDescription.category;
      return transaction;
    }
  }

  async sumCreditsByMonth(dateDto: DateDto, userId: number): Promise<number> {
    return this.transactionRepository.sumCreditsByMonth(dateDto, userId);
  }

  async averageCredits(userId: number): Promise<number> {
    return this.transactionRepository.averageCredits(userId);
  }

  async averageDebits(userId: number): Promise<number> {
    return this.transactionRepository.averageDebits(userId);
  }
}
