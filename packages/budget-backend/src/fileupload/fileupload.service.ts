import { Injectable } from '@nestjs/common';
import { Transaction } from '../transaction/transaction.entity';
import { TransactionRepository } from '../transaction/transaction.repository';
import { User } from '../auth/user.entity';
import { CategoryService } from 'src/category/category.service';
import { TransactionService } from 'src/transaction/transaction.service';

@Injectable()
export class FileuploadService {
  constructor(
    private transactionRepository: TransactionRepository,
    private transactionService: TransactionService,
    private categoryService: CategoryService,
  ) {}

  async importFile(file: any, user: User): Promise<Transaction[]> {
    const transactions = await this.transactionRepository.importFile(file, user);

    transactions.map(async transaction => {
      const category = await this.categoryService.getCategoryByDescription(transaction.description, user);

      if (category) {
        await this.transactionService.updateCategoryById(transaction.id, category, user);

      }

    });
    return transactions;

  }
}
