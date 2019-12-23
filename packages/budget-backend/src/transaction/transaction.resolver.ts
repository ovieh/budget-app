import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';
import { User } from '../auth/user.entity';
import { NotFoundException, UseGuards, Logger, ParseUUIDPipe } from '@nestjs/common';
import { CurrentUser } from '../auth/get-user.decorator';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CategoryService } from '../category/category.service';
import { CategoryInput } from '../category/category.input';
import { CreateTransactionDto } from './DTO/create-transaction.dto';

@Resolver(of => Transaction)
export class TransactionResolver {
  private logger = new Logger('Transaction Resolver');
  constructor(
    private readonly transactionService: TransactionService,
    private readonly categoryService: CategoryService,
  ) { }

  @Query(returns => String)
  @UseGuards(GqlAuthGuard)
  hi(
    @CurrentUser() user: User,
  ) {
    return `hi ${user.username}`;
  }

  @Query(returns => [Transaction])
  @UseGuards(GqlAuthGuard)
  async getTransactions(
    @CurrentUser() user: User,
  ): Promise<Transaction[]> {
    const transactions = await this.transactionService.getTransaction(user);

    if (!transactions) {
      throw new NotFoundException();
    }
    return transactions;

  }

  @Query(returns => Transaction)
  @UseGuards(GqlAuthGuard)
  async getTransactionById(
    @CurrentUser() user: User,
    @Args('id') id: string,
  ): Promise<Transaction> {
    const transaction = await this.transactionService.getTransactionsById(id, user);

    if (!transaction) {
      throw new NotFoundException();
    }
    return transaction;
  }

  @Query(returns => [Transaction])
  @UseGuards(GqlAuthGuard)
  async getTransactionByMonthAndYear(
    @Args('year') year: number,
    @Args('month') month: number,
    @CurrentUser() user: User,
  ) {
    return this.transactionService.getTransactionsByYearAndMonth(year, month, user);
  }

  @Mutation(returns => String)
  @UseGuards(GqlAuthGuard)
  async createTransaction(
    @CurrentUser() user: User,
    @Args() createTransactionDto: CreateTransactionDto,
  ): Promise<string> {

    this.transactionService.createTransaction(createTransactionDto, user);

    this.logger.verbose(`Transaction "${createTransactionDto.transactionDescription}" was created`);

    return `Transaction created`;
  }

  @Mutation(returns => String)
  @UseGuards(GqlAuthGuard)
  deleteTransaction(
    @Args('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: User,
  ): void {
    this.transactionService.deleteTransactionById(id, user);
  }

  // @Query(returns => [Category])
  // @UseGuards(GqlAuthGuard)
  // getTransactionByCategory(
  //   @CurrentUser() user: User,
  // ): Promise<Category[]> {
  //   return this.categoryService.findAll(user);
  // }

  @Mutation(returns => Transaction)
  @UseGuards(GqlAuthGuard)
  updateTransactionCategory(
    @Args('id') id: string,
    @Args('name') name: CategoryInput,
    @CurrentUser() user: User,
  ) {
    return this.transactionService.updateCategoryById(id, name, user);
  }

}