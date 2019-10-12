import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionRepository } from './transaction.repository';
import { Transaction } from './transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransactionDto } from './DTO/create-transaction.dto';
import { Category } from 'src/category/category.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionRepository)
    private transactionRepository: TransactionRepository,
  ) {}

  async getTransaction(): Promise<Transaction[]> {
    return await this.transactionRepository.find();
  }

  async getTransactionsById(id: string): Promise<Transaction> {
    return await this.transactionRepository.findOne(id);
  }

  async createTransaction(createTransactionDto: CreateTransactionDto) {
    return await this.transactionRepository.createTransaction(createTransactionDto);
  }

  async deleteTransactionById(id: string): Promise<void> {
    const result = await this.transactionRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`No id with "${id}" found!`);
    }
  }
  async updateCategoryById(
    id: string, category: Category): Promise<Transaction> {

    const transaction =  await this.getTransactionsById(id);

    transaction.name = category;
    await transaction.save();

    return transaction;

  }

}
