import { InternalServerErrorException, Logger } from '@nestjs/common';
import * as parse from 'csv-parse';
import * as dayjs from 'dayjs';
import { GetMonthByCategoryDto } from 'src/month/DTO/get-month-by-category.dto';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { CreateTransactionDto } from './DTO/create-transaction.dto';
import { YearMonth } from './DTO/year-month.dto';
import { Transaction } from './transaction.entity';
import customParseFormat = require('dayjs/plugin/customParseFormat');
import { DateDto } from '../month/DTO/date.dto';
import { Month } from '../month/month.entity';
dayjs.extend(customParseFormat);

@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {
  private logger = new Logger('Tranaction Repository');

  async importFile(file: Buffer, user: User): Promise<Transaction[]> {
    const transactions: Transaction[] = [];
    const parser = parse({
      delimiter: ',',
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
        if (
          (context.column === 'debitAmount' ||
            context.column === 'creditAmount') &&
          value === ''
        ) {
          return 0;
          // convert date format
        } else if (context.column === 'date') {
          return dayjs(value, 'DD/MM/YYYY').format('YYYY-MM-DD');
        } else {
          return value;
        }
      },
    });

    parser.on('readable', async () => {
      let transaction: Transaction;
      while ((transaction = parser.read())) {
        transaction.userId = user.id;
        transactions.push(transaction);
      }
    });

    parser.on('error', (err) => {
      this.logger.error(`Failed to parse transactions.`);
      throw new InternalServerErrorException(err.message);
    });

    parser.write(file.buffer);
    parser.end();

    // remove first element, which just contains headers
    transactions.shift();

    try {
      const savedTransactions = await this.save(transactions);
      return savedTransactions;
    } catch (error) {
      this.logger.error(`Failed to save transactions.`);
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
      type,
    } = createTransactionDto;

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

      this.logger.verbose(
        `Transaction "${createTransactionDto.description}" was created`,
      );

      return transaction;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Could not create transaction!');
    }
  }

  async getTransactionsByMonth(
    month: number,
    user: User,
  ): Promise<Transaction[]> {
    try {
      const results = await this.createQueryBuilder('transaction')
        .select('transaction')
        .where('transaction.userId = :userId', { userId: user.id })
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
    // skip: number,
    // take: number,
  ): Promise<Transaction[]> {
    console.log('this is happending');
    try {
      const results = await this.createQueryBuilder('transaction')
        .leftJoinAndSelect('transaction.month', 'month')
        .where('month.month = :month', { month })
        .andWhere('month.year = :year', { year: 1920 })
        .andWhere('transaction.userId = :userId', { userId: user.id })
        .take(1)
        .skip(0)
        .orderBy('transaction.date', 'DESC')
        .cache(true)
        .getMany();
      return results;
    } catch {
      this.logger.error(`Failed to get results for "${year}/${month}"`);
      throw new InternalServerErrorException();
    }
  }

  async getCreditsByYearAndMonth(
    year: number,
    month: number,
    user: User,
  ): Promise<Transaction[]> {
    try {
      const results = await this.createQueryBuilder('transaction')
        .select('transaction')
        .where('transaction.userId = :userId', { userId: user.id })
        .andWhere(`EXTRACT(Year FROM transaction.date) = ${year}`)
        .andWhere(`EXTRACT(Month FROM transaction.date) = ${month}`)
        .andWhere(`transaction.creditAmount > 0`)
        .andWhere(`transaction.debitAmount <= 0`)
        .orderBy('transaction.date', 'DESC')
        .cache(true)
        .getMany();
      return results;
    } catch {
      this.logger.error(`Failed to get results for "${year}/${month}"`);
      throw new InternalServerErrorException();
    }
  }

  async getDebitsByYearAndMonth(
    year: number,
    month: number,
    user: User,
  ): Promise<Transaction[]> {
    try {
      const results = await this.createQueryBuilder('transaction')
        .select('transaction')
        .where('transaction.userId = :userId', { userId: user.id })
        .andWhere(`EXTRACT(Year FROM transaction.date) = ${year}`)
        .andWhere(`EXTRACT(Month FROM transaction.date) = ${month}`)
        .andWhere(`transaction.creditAmount <= 0`)
        .andWhere(`transaction.debitAmount > 0`)
        .orderBy('transaction.date', 'DESC')
        .cache(true)
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
        .where('transaction.userId = :userId', { userId: user.id })
        .groupBy('year')
        .addGroupBy('month')
        .orderBy('year', 'ASC')
        .addOrderBy('month', 'ASC')
        .cache(true)
        .getRawMany();
      return results;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  // TODO: Figure out way to do this in one db transaction
  async updateCategoryById(
    id: string,
    categoryId: number,
    user: User,
  ): Promise<Transaction> {
    try {
      this.createQueryBuilder()
        .update(Transaction)
        .set({
          category: { id: categoryId },
        })
        .where('id = :id', { id })
        .andWhere('userId = :userId', { userId: user.id })
        .execute();
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        `Could not update transaction with id "${id}"`,
      );
    }

    const updatedTransaction = await this.findOne(id, {
      relations: ['category', 'month'],
    });

    if (!updatedTransaction)
      throw new InternalServerErrorException(
        `Could not update transaction with id "${id}"`,
      );

    return updatedTransaction;
  }

  async updateCategoryByIds(
    ids: string[],
    categoryId: number,
    user: User,
  ): Promise<void> {
    await this.createQueryBuilder()
      .update(Transaction)
      .set({ category: { id: categoryId } })
      .where('ids = :ids', ids)
      .andWhere('userId = :userId', { userId: user.id })
      .execute();
  }

  async sumDebitsByYearMonth(
    user: User,
    year: number,
    month: number,
  ): Promise<number> {
    const { sum } = await this.createQueryBuilder('transaction')
      .where('transaction.userId = :userId', { userId: user.id })
      .andWhere(`EXTRACT(Year FROM transaction.date) = ${year}`)
      .andWhere(`EXTRACT(Month FROM transaction.date) = ${month}`)
      .select('SUM(transaction.debitAmount)', 'sum')
      .cache(true)
      .getRawOne();
    return sum || 0;
  }

  async transactionsByMonthAndCategory(
    getMonthByCategoryDto: GetMonthByCategoryDto,
    user: User,
  ): Promise<Transaction[]> {
    const { month, year, categoryId } = getMonthByCategoryDto;

    const result = await this.query(
      `select * from transaction t left join "month" m2 
              on m2.id = t."monthId" 
              where m2.year = $1 and m2.month = $2
              and t."categoryId" = $3 and t."userId" = $4`,
      [year, month, categoryId, user.id],
    );
    return result;
  }

  async sumCreditsByMonth(dateDto: DateDto, userId: number): Promise<number> {
    const { month, year } = dateDto;

    const result = await this.query(
      `select sum(transaction."creditAmount")
          from month m
          left join "transaction" on transaction."monthId" = m.id
          where m.month = $1  and m."year" = $2 
          and transaction."userId" = $3;`,
      [month, year, userId],
    );
    return result[0].sum || 0;
  }
}
