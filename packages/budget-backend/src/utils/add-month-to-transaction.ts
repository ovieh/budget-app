import { Transaction } from 'src/transaction/transaction.entity';
import { Category } from 'src/category/category.entity';

export function AddMonthToTransaction(
  transaction: Transaction,
  category: Category,
) {
  const d = new Date(transaction.date);
  const date = {
    month: d.getMonth() + 1,
    year: d.getFullYear(),
    transaction,
    category: [category],
  };

  return date;
}
