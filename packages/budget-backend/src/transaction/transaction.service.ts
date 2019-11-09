import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionRepository } from './transaction.repository';
import { Transaction } from './transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransactionDto } from './DTO/create-transaction.dto';
import { Category } from '../category/category.entity';
import { User } from '../auth/user.entity';

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
    category: Category,
    user: User,
    ): Promise<Transaction> {

    const transaction =  await this.getTransactionsById(id, user);

    transaction.name = category;
    await transaction.save();

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
