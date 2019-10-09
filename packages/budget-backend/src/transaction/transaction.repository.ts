import { Transaction } from './transaction.entity';
import { EntityRepository, Repository } from 'typeorm';
import * as parse from 'csv-parse/lib/sync';
import { Logger, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {
  private logger = new Logger('Tranaction Repository');
  async importFile(file): Promise<Transaction[]> {

    const readTransactions = parse(file.buffer.toString(), {
      columns: true,
    });

    try {
      const transaction =  await this.save(readTransactions);
      return transaction;
    } catch (error) {
      this.logger.error(`Failed to save transaction.`);
      throw new InternalServerErrorException();
    }

  }

}
