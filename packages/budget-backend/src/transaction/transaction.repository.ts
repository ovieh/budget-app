import { InternalServerErrorException, Logger } from '@nestjs/common';
import * as parse from 'csv-parse/lib/sync';
import * as moment from 'moment';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { CreateTransactionDto } from './DTO/create-transaction.dto';
import { YearMonth } from './DTO/year-month.dto';
import { Transaction } from './transaction.entity';

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
        'date',
        'type',
        'sortCode',
        'accountNumber',
        'description',
        'debitAmount',
        'creditAmount',
        'balance',
      ],
      cast: (value, context) => {
        // Casts empty debits / credits as 0
        if ((context.column === 'debitAmount' || context.column === 'creditAmount') && value === '') {
          return 0;
        // convert date format
        } else if (context.column === 'date') {
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
    ): Promise<Transaction> {
    const {
      accountNumber,
      balance,
      creditAmount,
      date,
      debitAmount,
      description,
      sortCode,
      type } = createTransactionDto;

    const transaction = new Transaction();
    transaction.accountNumber = accountNumber;
    transaction.balance = balance;
    transaction.creditAmount = creditAmount;
    transaction.date = date;
    transaction.debitAmount = debitAmount;
    transaction.description = description;
    transaction.sortCode = sortCode;
    transaction.type = type;
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
      .andWhere(`EXTRACT(Month FROM transaction.date) = ${month}`)
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
    pagination: number,
  ): Promise<Transaction[]> {

    try {
      const results = await this.createQueryBuilder('transaction')
      .select('transaction')
      .where('transaction.userId = :userId', {userId: user.id})
      .andWhere(`EXTRACT(Year FROM transaction.date) = ${year}`)
      .andWhere(`EXTRACT(Month FROM transaction.date) = ${month}`)
      .limit(pagination)
      .offset(pagination)
      .getMany();
      return results;
    } catch {
      this.logger.error(`Failed to get results for "${year}/${month}"`);
      throw new InternalServerErrorException();
    }
  }

  async getYearMonth(user: User): Promise<YearMonth[]> {
    try {
      const results = await this.createQueryBuilder()
        .select(`EXTRACT(YEAR FROM transaction.date) as year`)
        .addSelect(`EXTRACT(MONTH FROM transaction.date) as month`)
        .from(Transaction, 'transaction')
        .where('transaction.userId = :userId', {userId: user.id})
        .groupBy('year')
        .addGroupBy('month')
        .orderBy('year', 'DESC')
        .addOrderBy('month', 'DESC')
        .getRawMany();
      return results;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

}
