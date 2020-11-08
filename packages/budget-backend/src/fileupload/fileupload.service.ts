import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../transaction/transaction.repository';
import { User } from '../auth/user.entity';
import { TransactionService } from 'src/transaction/transaction.service';
import { Transaction } from 'src/transaction/transaction.entity';
import { MonthService } from 'src/month/month.service';
import { sortTransactionsByMonth } from 'src/utils/sort-transactions-by-month';
import { SyncStrategy } from '../transaction/sync-strategy.enum';

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

    const categories = transactions.map(async (transaction) => {
      return this.transactionService.syncCategory(transaction, user);
    });

    const transactionWithCategories = await Promise.all(categories);

    // loop through transaction, sync transaction descriptions
    const updatedTransactions = transactionWithCategories.map(
      async (transaction) =>
        await this.transactionService.syncDescription(transaction, SyncStrategy.Bulk),
    );


    let resolvedTransactions: Transaction[];
    try {
      resolvedTransactions = await Promise.all(updatedTransactions);
    } catch (error) {
      console.log(error);
    }

    let savedTransactions: Transaction[];
    try {
      savedTransactions = await this.transactionRepository.save(resolvedTransactions);
    } catch (error) {
      console.log(error);
    }

    // loop through add find unique months and add to set
    const dateSet = new Set();

    savedTransactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      const date = `${
        transactionDate.getMonth() + 1
      }-${transactionDate.getFullYear()}`;
      dateSet.add(date);
    });

    const months = Array.from(dateSet) as string[];

    // split transactions by (unique) month
    const sortedTransactions = sortTransactionsByMonth(
      savedTransactions,
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
        savedTransactions[i].userId,
      );
    });

    await Promise.all(monthsUnresolved);

    const result = savedTransactions.map(
      async (transaction) =>
        await this.transactionService.syncMonth(transaction),
    );

    return Promise.all(result);
  }
}
