import { Transaction } from 'src/transaction/transaction.entity';

export function getMonthsFromTransactions(
  transactions: Transaction[],
  userId: number,
) {
  return transactions.map((transaction) => {
    const date = new Date(transaction.date);

    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      userId,
    };
  });
}
