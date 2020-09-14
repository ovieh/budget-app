import { Transaction } from 'src/transaction/transaction.entity';

export function sortTransactionsByMonth(
  transactions: Transaction[],
  months: string[],
) {
  return months.map((month) => {
    const m = parseInt(month.split('-')[0], 10);
    const y = parseInt(month.split('-')[1], 10);

    return transactions.filter(
      ({ date }) =>
        parseInt(date.split('-')[0], 10) === y &&
        parseInt(date.split('-')[1], 10) === m,
    );
  });
}
