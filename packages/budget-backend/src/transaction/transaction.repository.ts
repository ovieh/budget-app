import { Transaction } from './transaction.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTransactionDto } from './DTO/create-transaction.dto';
import * as parse from 'csv-parse/lib/sync';
import * as csv from 'csv-parse';
import * as moment from 'moment';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { User } from '../auth/user.entity';
import { UploadScalar } from 'src/fileupload/upload.scalar';
import { OutputFileType } from 'typescript';

@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {
  private logger = new Logger('Tranaction Repository');
  async importFile(
    file: Buffer,
    user: User,
    ): Promise<Transaction[]> {

    // Rewrite this as stream
    const parsedTransactions = parse(file.buffer.toString(), {
      columns: [
        'transactionDate',
        'transactionType',
        'sortCode',
        'accountNumber',
        'transactionDescription',
        'debitAmount',
        'creditAmount',
        'balance',
      ],
      cast: (value, context) => {
        // Casts empty debits / credits as 0
        if ((context.column === 'debitAmount' || context.column === 'creditAmount') && value === '') {
          return 0;
        // convert date format
        } else if (context.column === 'transactionDate') {
          return moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD');
        } else {
          return value;
        }
      },
    });

    // remove first element, which just containers headers
    parsedTransactions.shift();

    const transactions = parsedTransactions.map(transaction => ({...transaction, user}));

    try {
      const transaction =  await this.save(transactions);
      return transaction;
    } catch (error) {
      this.logger.error(`Failed to save transaction.`);
      throw new InternalServerErrorException(error);
    }
  }

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
    user: User,
    ) {
    const {
      accountNumber,
      balance,
      creditAmount,
      transactionDate,
      debitAmount,
      transactionDescription,
      sortCode,
      transactionType } = createTransactionDto;

    const transaction = new Transaction();
    transaction.accountNumber = accountNumber;
    transaction.balance = balance;
    transaction.creditAmount = creditAmount;
    transaction.transactionDate = transactionDate;
    transaction.debitAmount = debitAmount;
    transaction.transactionDescription = transactionDescription;
    transaction.sortCode = sortCode;
    transaction.transactionType = transactionType;
    transaction.user = user;
    try {
      await transaction.save();
      return transaction;
    } catch (error) {
      this.logger.error(error);
    }

  }

  async getTransactionsByMonth(
    month: number,
    user: User,
  ): Promise<Transaction[]> {

    try {
      const results = await this.createQueryBuilder('transaction')
      .select('transaction')
      .where('transaction.userId = :userId', {userId: user.id})
      .andWhere(`EXTRACT(Month FROM transaction.transactionDate) = ${month}`)
      .getMany();

      return results;
    } catch {
      this.logger.error(`Failed to get results for month: "${month}"`);
      throw new InternalServerErrorException();
    }
  }

  async getTransactionsByYearAndMonth(
    year: number,
    month: number,
    user: User,
  ): Promise<Transaction[]> {

    try {
      const results = await this.createQueryBuilder('transaction')
      .select('transaction')
      .where('transaction.userId = :userId', {userId: user.id})
      .andWhere(`EXTRACT(Year FROM transaction.transactionDate) = ${year}`)
      .andWhere(`EXTRACT(Month FROM transaction.transactionDate) = ${month}`)
      .getMany();

      return results;
    } catch {
      this.logger.error(`Failed to get results for "${year}/${month}"`);
      throw new InternalServerErrorException();
    }
  }

}
