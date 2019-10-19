import { Injectable } from '@nestjs/common';
import { Transaction } from '../transaction/transaction.entity';
import { TransactionRepository } from '../transaction/transaction.repository';
import { User } from '../auth/user.entity';

@Injectable()
export class FileuploadService {
  constructor(
    private transactionRepository: TransactionRepository,
  ) {}

  async importFile(file: Buffer, user: User): Promise<Transaction[]> {
    return this.transactionRepository.importFile(file, user);
  }
}
