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

  async importFile(file: any, user: User) {
    const transactions = await this.transactionRepository.importFile(file, user);

    // const sortedTransactions = transactions.sort((a: Transaction, b: Transaction) => {
    //   if (a.description < b.description) {
    //     return -1;
    //   }

    //   if (a.description > b.description) {
    //     return 1;
    //   }
    //   return 0;
    // });

    // const groupedTransactions = sortedTransactions.reduce((obj, transaction) => {
    //     const description = transaction.description;

    //     if (!obj.hasOwnProperty(description)) {
    //       obj[description] = [];
    //     }

    //     obj[description].push(transaction);

    //   return obj;
    // }, {});

    
    // const keys = Object.keys(groupedTransactions);

    // keys.map(async key => {
    //   const category = await this.categoryService.getCategoryByDescription(key, user);
    //   // groupedTransactions[key]
    //   if (category) {
    //     await this.transactionService.updateCategoryByIds(keys, category, user);
    //   }
    // });

    transactions.map(async transaction => {
      let categoryId: number;
      try {
        categoryId = await this.categoryService.getCategoryByDescription(transaction.description, user);
      } catch(error) {
        console.log(`this is an error ${error}`)
        return;
      }
      console.log(`============CATEGORY_ID========${categoryId}=========================`)
      if (categoryId) {
        await this.transactionService.updateCategoryById(transaction.id, categoryId, user);

      }

    });
    return transactions;

  }
}
