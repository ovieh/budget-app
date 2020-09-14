import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../transaction/transaction.repository';
import { User } from '../auth/user.entity';
import { TransactionService } from 'src/transaction/transaction.service';
import { Transaction } from 'src/transaction/transaction.entity';
import { MonthService } from 'src/month/month.service';
import { sortTransactionsByMonth } from 'src/utils/sort-transactions-by-month';

@Injectable()
export class FileuploadService {
  constructor(
    private transactionRepository: TransactionRepository,
    private transactionService: TransactionService,
    private monthService: MonthService,
  ) {}

  async importFile(file: Buffer, user: User): Promise<Transaction[]> {
    const transactions = await this.transactionRepository.importFile(
      file,
      user,
    );

    transactions.map(async (transaction) => {
      return this.transactionService.syncTransaction(transaction, user);
    });

    const updatedTransactions = await Promise.all(transactions);

    // loop through transaction, sync transaction descriptions
    const descriptions = transactions.map((transaction) =>
      this.transactionService.syncDescription(transaction),
    );

    await Promise.all(descriptions);

    // loop through add find unique months and add to set
    const dateSet = new Set();

    updatedTransactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      const date = `${
        transactionDate.getMonth() + 1
      }-${transactionDate.getFullYear()}`;
      dateSet.add(date);
    });

    const months = Array.from(dateSet) as string[];

    // split transactions by (unique) month
    const sortedTransactions = sortTransactionsByMonth(
      updatedTransactions,
      months,
    );

    // create unique months, add month, year, transactions
    const monthsUnresolved = months.map((date: string, i) => {
      const newMonth = {
        month: parseInt(date.split('-')[0], 10),
        year: parseInt(date.split('-')[1], 10),
        transactions: sortedTransactions[i],
      };
      return this.monthService.createMonth(
        newMonth,
        updatedTransactions[i].userId,
      );
    });

    await Promise.all(monthsUnresolved);

    const result = updatedTransactions.map(
      async (transaction) =>
        await this.transactionService.syncMonth(transaction),
    );

    return Promise.all(result);
  }
}
