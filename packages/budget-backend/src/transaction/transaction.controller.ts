import { Controller, Get, Param, ParseUUIDPipe, Post, Body, Logger, Delete, Patch } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CategoryService } from '../category/category.service';
import { Transaction } from './transaction.entity';
import { Category } from '../category/category.entity';
import { CreateTransactionDto } from './DTO/create-transaction.dto';
import { CreateCategoryDto } from './DTO/create-category.dto';

@Controller('transaction')
export class TransactionController {
  private logger = new Logger('Task Controller');
  constructor(private transactionService: TransactionService,
              private categoryService: CategoryService,
  ) {}

  @Get()
  getTransaction(): Promise<Transaction[]> {
    return this.transactionService.getTransaction();
  }

  @Get('/:id')
  getTransactionById(
    @Param('id', ParseUUIDPipe) id: string,
    ): Promise<Transaction> {
    return this.transactionService.getTransactionsById(id);
  }

  @Post()
  createTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    this.logger.verbose(`Transaction "${createTransactionDto.transactionDescription}" was created`);
    return this.transactionService.createTransaction(createTransactionDto);
  }

  @Delete('/:id')
  deleteTransaction(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return this.transactionService.deleteTransactionById(id);
  }

  @Post('/category')
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get('/:id/category')
  getTransactionCategory(): Promise <Category[]> {
    return this.categoryService.findAll();
  }

  @Patch('/:id/category')
  updateCategoryById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('name') name: Category,
  ): Promise<Transaction> {
    return this.transactionService.updateCategoryById(id, name);
  }
}
