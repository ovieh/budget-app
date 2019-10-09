import { Controller, Get } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  getTransaction(): Promise<Transaction[]> {
    return this.transactionService.findAll();
  }
}
