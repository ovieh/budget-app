import { Transaction } from './transaction.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTransactionDto } from './DTO/create-transaction.dto';
import * as parse from 'csv-parse/lib/sync';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import { User } from '../auth/user.entity';

@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {
  private logger = new Logger('Tranaction Repository');
  async importFile(
    file: Buffer,
    user: User,
    ): Promise<Transaction[]> {
    const toCamel = (json: object) => {
      let newO; let origKey; let newKey; let value;
      if (json instanceof Array) {
        // tslint:disable-next-line:no-shadowed-variable
        return json.map((value) => {
            if (typeof value === 'object') {
              value = toCamel(value);
            }
            return value;
        });
      } else {
        newO = {};
        for (origKey in json) {
          if (json.hasOwnProperty(origKey)) {
            newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString();
            value = json[origKey];
            if (value instanceof Array || (value !== null && value.constructor === Object)) {
              value = toCamel(value);
            }
            newO[newKey] = value;
          }
        }
      }
      return newO;
    };

    const parsedTransactions = parse(file.buffer.toString(), {
      columns: true,
    });
    const arr = toCamel(JSON.parse(JSON.stringify(parsedTransactions).replace(/\s(?=\w+":)/g, '')));

    const transactions = arr.map(transaction => ({...transaction, user}));

    try {
      const transaction =  await this.save(transactions);
      return transaction;
    } catch (error) {
      this.logger.error(`Failed to save transaction.`);
      throw new InternalServerErrorException();
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
    await transaction.save();
    return transaction;
  }

  async getTransactionsByMonth(
    month: number, user: User): Promise<Transaction[]> {

    try {
      const query = await this.createQueryBuilder('transaction')
      .select('transaction')
      .where('transaction.userId = :userId', {userId: user.id})
      .andWhere(`EXTRACT(Month FROM transaction.transactionDate) = ${month}`)
      .getMany();

      return query;
    } catch {
      this.logger.error(`Failed to get results for month: "${month}"`);
      throw new InternalServerErrorException();
    }
  }
}
