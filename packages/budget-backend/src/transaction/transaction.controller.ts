import { Controller, Get, Param, ParseUUIDPipe, Post, Body, Logger, Delete, Patch, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CategoryService } from '../category/category.service';
import { Transaction } from './transaction.entity';
import { Category } from '../category/category.entity';
import { CreateTransactionDto } from './DTO/create-transaction.dto';
import { CreateCategoryDto } from './DTO/create-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('transaction')
@UseGuards(AuthGuard())
export class TransactionController {
  private logger = new Logger('Task Controller');
  constructor(private transactionService: TransactionService,
              private categoryService: CategoryService,
  ) {}

  @Get('/findall')
  findAll(): Promise<Transaction[]> {
    return this.transactionService.findAll();
  }

  @Get()
  getTransactions(
    @GetUser() user: User,
  ): Promise<Transaction[]> {
    return this.transactionService.getTransaction(user);
  }

  @Get('/:id')
  getTransactionById(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
    ): Promise<Transaction> {
    return this.transactionService.getTransactionsById(id, user);
  }

  @Post('/create')
  createTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
    @GetUser() user: User,
  ): Promise<Transaction> {
    this.logger.verbose(`Transaction "${createTransactionDto.description}" was created`);
    return this.transactionService.createTransaction(createTransactionDto, user);
  }

  @Delete('/:id')
  deleteTransaction(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.transactionService.deleteTransactionById(id, user);
  }

  @Post('/category')
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @GetUser() user: User,
  ): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto, user);
  }

  @Get('/:id/category')
  getTransactionCategory(
    @GetUser() user: User,
  ): Promise <Category[]> {
    return this.categoryService.findAll(user);
  }

  @Patch('/:id/category')
  updateCategoryById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('name') name: Category,
    @GetUser() user: User,
  ): Promise<Transaction> {
    return this.transactionService.updateCategoryById(id, name, user);
  }

  @Get('/date/:month')
  getTransactionsByMonth(
    @Param('month')  month: number,
    @GetUser() user: User,
  ): Promise<Transaction[]> {
    return this.transactionService.getTransactionsByMonth(month, user);
  }

  @Get('/date/:year/:month')
  getTransactionsByYearAndMonth(
    @Param('year') year: number,
    @Param('month') month: number,
    @Param('pagination') pagination: number,
    @GetUser() user: User,
  ): Promise<Transaction[]> {
    return this.transactionService.getTransactionsByYearAndMonth(year, month, user, pagination);
  }

}
