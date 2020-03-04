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
import { getConnection } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionRepository)
    private transactionRepository: TransactionRepository,
    private categoryService: CategoryService,
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
    const found =  await this.transactionRepository.findOne({
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
    // categoryInput: CategoryInput,
    categoryId: number,
    user: User,
  ): Promise<string> {
    // TODO: Fix this
    // const category = JSON.parse(JSON.stringify(categoryInput));

    try {
      this.transactionRepository.updateCategoryById(id, categoryId, user)
    } catch(error) {
      throw new InternalServerErrorException(`Could not update transaction with id ${id}`)
    }
    return `Updated category for transaction with id ${id}`

  }

  async updateCategoryByIds(
    ids: string[],
    categoryInput: CategoryInput,
    user: User,
  ): Promise<string> {
    // TODO: Fix this
    const category = JSON.parse(JSON.stringify(categoryInput));

    try {
      this.transactionRepository.updateCategoryByIds(ids, category.id, user)
    } catch(error) {
      throw new InternalServerErrorException(`Could not update transaction with id ${ids}`)
    }
    return `Updated category for transaction with id ${ids}`

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

  async getYearMonth(user: User): Promise<YearMonth[]> {
    return await this.transactionRepository.getYearMonth(user);
  }
}
