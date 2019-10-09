import { Injectable } from '@nestjs/common';
import { TransactionRepository } from './transaction.repository';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    private transactionRepository: TransactionRepository,
  ) {}

  async findAll(): Promise<Transaction[]> {
    return await this.transactionRepository.find();
  }
}
