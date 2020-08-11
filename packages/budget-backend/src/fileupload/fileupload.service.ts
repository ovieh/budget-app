import { Injectable, BadRequestException } from '@nestjs/common';
import { TransactionRepository } from '../transaction/transaction.repository';
import { User } from '../auth/user.entity';
import { CategoryService } from 'src/category/category.service';
import { TransactionService } from 'src/transaction/transaction.service';
import { Category } from 'src/category/category.entity';
import { Transaction } from 'src/transaction/transaction.entity';
import { AddMonthToTransaction } from 'src/utils/add-month-to-transaction';
import { MonthService } from 'src/month/month.service';
import { CreateMonthDto } from 'src/month/DTO/create-month.dto';

@Injectable()
export class FileuploadService {
  constructor(
    private transactionRepository: TransactionRepository,
    private transactionService: TransactionService,
    private categoryService: CategoryService,
    private monthService: MonthService,
  ) {}

  async importFile(file: any, user: User): Promise<Transaction[]> {
    const transactions = await this.transactionRepository.importFile(
      file,
      user,
    );

    transactions.map(async (transaction) => {
      let category;
      try {
        category = await this.categoryService.getCategoryByDescription(
          transaction.description,
          user,
        );
      } catch (error) {
        throw new BadRequestException('Could not parse transactions.');
      }

      if (category) {
        await this.transactionService.updateCategoryById(
          transaction.id,
          category.id,
          user,
        );
      }

      const date = AddMonthToTransaction(transaction, category);

      const month = { ...date, categories: [category] };

      transaction.month = await this.monthService.createMonth(month, user);
    });
    return transactions;
  }
}
