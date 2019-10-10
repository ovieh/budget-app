import { Injectable } from '@nestjs/common';
import { Transaction } from '../transaction/transaction.entity';
import { TransactionRepository } from '../transaction/transaction.repository';

@Injectable()
export class FileuploadService {
  constructor(
    private transactionRepository: TransactionRepository,
  ) {}

  async importFile(file: Buffer): Promise<Transaction[]> {
    return this.transactionRepository.importFile(file);
  }
}
