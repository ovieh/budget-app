import {
  Resolver,
  Query,
  Args,
  Mutation,
  Parent,
  ResolveField,
  Float,
} from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';
import { User } from '../auth/user.entity';
import {
  NotFoundException,
  UseGuards,
  Logger,
  ParseUUIDPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { CurrentUser } from '../auth/get-user.decorator';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CreateTransactionDto } from './DTO/create-transaction.dto';
import { Category } from '../category/category.entity';
import { YearMonth } from './DTO/year-month.dto';
import { Loader } from '@ovieh/nestjs-dataloader';
import DataLoader = require('dataloader');
import { CategoryLoader } from '../category/category.loader';
import { GetMonthByCategoryDto } from 'src/month/DTO/get-month-by-category.dto';
import { DateDto } from '../month/DTO/date.dto';

@Resolver(() => Transaction)
export class TransactionResolver {
  private logger = new Logger('Transaction Resolver');
  constructor(private readonly transactionService: TransactionService) {}

  @Query(() => User, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: User): Promise<User> {
    if (user) {
      return user;
    }
    return null;
  }

  @Query(() => [Transaction])
  @UseGuards(GqlAuthGuard)
  async getTransactions(@CurrentUser() user: User): Promise<Transaction[]> {
    const transactions = await this.transactionService.getTransaction(user);
    if (!transactions) {
      throw new NotFoundException();
    }
    return transactions;
  }

  @Query(() => Transaction)
  @UseGuards(GqlAuthGuard)
  async getTransactionById(
    @CurrentUser() user: User,
    @Args('id') id: string,
  ): Promise<Transaction> {
    const transaction = await this.transactionService.getTransactionsById(
      id,
      user,
    );

    if (!transaction) {
      throw new NotFoundException();
    }
    return transaction;
  }

  @Query(() => [Transaction])
  @UseGuards(GqlAuthGuard)
  async getTransactionsByMonthAndYear(
    @Args('year') year: number,
    @Args('month') month: number,
    @CurrentUser() user: User,
  ): Promise<Transaction[]> {
    const result = await this.transactionService.getTransactionsByYearAndMonth(
      year,
      month,
      user,
    );
    return result;
  }

  @Query(() => [Transaction])
  @UseGuards(GqlAuthGuard)
  async getCreditsByMonthAndYear(
    @Args('year') year: number,
    @Args('month') month: number,
    @CurrentUser() user: User,
  ): Promise<Transaction[]> {
    const result = await this.transactionService.getCreditsByYearAndMonth(
      year,
      month,
      user,
    );
    return result;
  }

  @Query(() => [Transaction])
  @UseGuards(GqlAuthGuard)
  async getDebitsByMonthAndYear(
    @Args('year') year: number,
    @Args('month') month: number,
    @CurrentUser() user: User,
  ): Promise<Transaction[]> {
    const result = await this.transactionService.getDebitsByYearAndMonth(
      year,
      month,
      user,
    );
    return result;
  }

  @Query(() => [YearMonth])
  @UseGuards(GqlAuthGuard)
  async getYearMonth(@CurrentUser() user: User): Promise<YearMonth[]> {
    return this.transactionService.getYearMonth(user);
  }

  @Mutation(() => Transaction)
  @UseGuards(GqlAuthGuard)
  async createTransaction(
    @CurrentUser() user: User,
    @Args() createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionService.createTransaction(
      createTransactionDto,
      user,
    );
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  deleteTransaction(
    @Args('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: User,
  ): void {
    this.transactionService.deleteTransactionById(id, user);
  }

  @Mutation(() => Transaction)
  @UseGuards(GqlAuthGuard)
  updateTransactionCategory(
    @Args('id') id: string,
    @Args('categoryId') categoryId: number,
    @CurrentUser() user: User,
  ): Promise<Transaction> {
    return this.transactionService.updateCategoryById(id, categoryId, user);
  }

  @Query(() => Float)
  @UseGuards(GqlAuthGuard)
  sumDebitsByYearMonth(
    @Args('year', ParseIntPipe) year: number,
    @Args('month', ParseIntPipe) month: number,
    @CurrentUser() user: User,
  ): Promise<number> {
    return this.transactionService.sumDebitsByYearMonth(user, year, month);
  }

  @Query(() => [Transaction])
  @UseGuards(GqlAuthGuard)
  async transactionsByMonthAndCategory(
    @Args() getMonthByCategoryDto: GetMonthByCategoryDto,
    @CurrentUser() user: User,
  ): Promise<Transaction[]> {
    return this.transactionService.transactionsByMonthAndCateogry(
      getMonthByCategoryDto,
      user,
    );
  }

  @Query(() => Float)
  @UseGuards(GqlAuthGuard)
  async sumCreditsByMonth(
    @Args() dateDto: DateDto,
    @CurrentUser() user: User,
  ): Promise<number> {
    return this.transactionService.sumCreditsByMonth(dateDto, user.id);
  }

  @Query(() => Float)
  @UseGuards(GqlAuthGuard)
  async averageCredits(
    @CurrentUser() user: User,
  ): Promise<number> {
    return this.transactionService.averageCredits(user.id);
  }

  @Query(() => Float)
  @UseGuards(GqlAuthGuard)
  async averageDebits(
    @CurrentUser() user: User,
  ): Promise<number> {
    return this.transactionService.averageDebits(user.id);
  }

  // TODO: why isn't this passing the user?
  @ResolveField(() => Category)
  @UseGuards(GqlAuthGuard)
  async category(
    @Parent() transaction: Transaction,
    @CurrentUser() user: User,
    @Loader(CategoryLoader.name)
    categoryLoader: DataLoader<Category['id'], Category>,
  ): Promise<Category> {
    const { category } = transaction;

    if (category.id !== null) {
      return categoryLoader.load(category.id);
    }
  }
}
