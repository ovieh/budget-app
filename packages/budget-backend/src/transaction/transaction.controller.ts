import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  getTransaction(): Promise<Transaction[]> {
    return this.transactionService.findAll();
  }

  @Get('/:id')
  getTransactionById(
    @Param('id', ParseUUIDPipe) id: string,
    ): Promise<Transaction> {
    return this.transactionService.findOne(id);
  }

}
