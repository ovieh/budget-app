import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { TransactionRepository } from './transaction.repository';
import { Transaction } from './transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransactionDto } from './DTO/create-transaction.dto';
import { User } from '../auth/user.entity';
import { CategoryInput } from '../category/category.input';
import { YearMonth } from './DTO/year-month.dto';
import { CategoryService } from '../category/category.service';
import { CreateMonthDto } from 'src/month/DTO/create-month.dto';
import { MonthService } from 'src/month/month.service';
import { Month } from 'src/month/month.entity';
import { AddMonthToTransaction } from 'src/utils/add-month-to-transaction';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionRepository)
    private transactionRepository: TransactionRepository,
    private categoryService: CategoryService,
    private monthService: MonthService,
  ) {}

  // async importFile(file: Buffer, user: User) {
  //   // const { id } = await this.categoryService.getCategoryByDescription("TFL TRAVEL CH", user);
  // }

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

    console.log('CATEGORY CATEGORY', category);

    if (category) {
      await this.updateCategoryById(transaction.id, category.id, user);
    }

    const date = AddMonthToTransaction(transaction, category)

    transaction.month = await this.monthService.createMonth(date, user); 
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
    // categoryInput: CategoryInput,
    categoryId: number,
    user: User,
  ): Promise<Transaction> {
    // TODO: Fix this
    // const category = JSON.parse(JSON.stringify(categoryInput));

    try {
      return this.transactionRepository.updateCategoryById(
        id,
        categoryId,
        user,
      );
    } catch (error) {
      throw new InternalServerErrorException(
        `Could not update transaction with id ${id}`,
      );
    }
    // return id;
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

}
