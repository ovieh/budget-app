import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { TransactionRepository } from './transaction.repository';
import { Transaction } from './transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransactionDto } from './DTO/create-transaction.dto';
import { Category } from '../category/category.entity';
import { User } from '../auth/user.entity';
import { CategoryInput } from '../category/category.input';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionRepository)
    private transactionRepository: TransactionRepository,
  ) {}

  async getTransaction(
    user: User): Promise<Transaction[]> {
    return await this.transactionRepository.find({ userId: user.id });
  }

  async findAll(): Promise<Transaction[]> {
    return await this.transactionRepository.find();
  }

  async getTransactionsById(
    id: string, user: User): Promise<Transaction> {
    return await this.transactionRepository.findOne({where: { id, userId: user.id }});
  }

  async createTransaction(
    createTransactionDto: CreateTransactionDto, user: User) {
    return await this.transactionRepository.createTransaction(createTransactionDto, user);
  }

  async deleteTransactionById(id: string, user: User): Promise<void> {
    const result = await this.transactionRepository.delete({ id, userId: user.id });

    if (result.affected === 0) {
      throw new NotFoundException(`No id with "${id}" found!`);
    }
  }
  async updateCategoryById(
    id: string,
    categoryInput: CategoryInput,
    user: User,
    ): Promise<Transaction> {
    const transaction =  await this.getTransactionsById(id, user);
    // TODO: Fix this
    const category = JSON.parse(JSON.stringify(categoryInput));

    transaction.name = category.id;
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
  ): Promise<Transaction[]> {
    return await this.transactionRepository.getTransactionsByYearAndMonth(year, month, user);
  }

}
