import { Controller, Get, Param, ParseUUIDPipe, Post, Body, Logger } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './DTO/create-transaction.dto';

@Controller('transaction')
export class TransactionController {
  private logger = new Logger('Task Controller');
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

  @Post()
  createTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    this.logger.verbose(`Transaction "${createTransactionDto.transactionDescription}" was created`);
    return this.transactionService.createTransaction(createTransactionDto);
  }

}
