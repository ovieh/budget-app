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
import { requiredSubselectionMessage } from 'graphql/validation/rules/ScalarLeafs';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionRepository)
    private transactionRepository: TransactionRepository,
    private categoryService: CategoryService,
  ) {}

  async getTransaction(user: User): Promise<Transaction[]> {
    return await this.transactionRepository.find({ userId: user.id });
  }

  async findAll(): Promise<Transaction[]> {
    return await this.transactionRepository.find();
  }

  async getTransactionsById(id: string, user: User): Promise<Transaction> {
    return await this.transactionRepository.findOne({
      where: { id, userId: user.id },
    });
  }

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
    user: User,
  ): Promise<Transaction> {
    const result = await this.transactionRepository.createTransaction(
      createTransactionDto,
      user,
    );

    const category = await this.categoryService.getCategoryByDescription(result.description, user);

    if (category) {
      await this.updateCategoryById(result.id, category , user);
    }

    return result;
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
    categoryInput: CategoryInput,
    user: User,
  ): Promise<Transaction> {
    const transaction = await this.getTransactionsById(id, user);
    // TODO: Fix this
    const category = JSON.parse(JSON.stringify(categoryInput));

    transaction.categoryId = category.id;
    try {
      await transaction.save();
    } catch (error) {
      throw new InternalServerErrorException('This broke', error);
    }
    return transaction;
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
    pagination: number,
  ): Promise<Transaction[]> {
    return await this.transactionRepository.getTransactionsByYearAndMonth(
      year,
      month,
      user,
      pagination,
    );
  }

  async getYearMonth(user: User): Promise<YearMonth[]> {
    return await this.transactionRepository.getYearMonth(user);
  }
}
