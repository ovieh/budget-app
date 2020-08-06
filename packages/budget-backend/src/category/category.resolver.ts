import { Resolver, Query, Args, Mutation, Float } from '@nestjs/graphql';
import { Category } from './category.entity';
import { Logger, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CurrentUser } from '../auth/get-user.decorator';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { User } from '../auth/user.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from '../transaction/DTO/create-category.dto';
import { DateInput } from './date.input';
import { ChartData } from './chartData.output';

@Resolver(() => Category)
export class CategoryResolver {
  private logger = new Logger('Category Resolver');
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => Category)
  @UseGuards(GqlAuthGuard)
  getTransactionsByCategory(
    @Args('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ): Promise<Category> {
    return this.categoryService.getCategoryById(id, user);
  }

  @Query(() => [Category])
  @UseGuards(GqlAuthGuard)
  getCategories(@CurrentUser() user: User): Promise<Category[]> {
    return this.categoryService.findAll(user);
  }

  @Mutation(() => Category)
  @UseGuards(GqlAuthGuard)
  updateCategory(
    @Args('id') id: number,
    @Args('name') name: string,
    @Args('budget') budget: number,
    @CurrentUser() user: User,
  ) {
    return this.categoryService.updateCategory(id, user, name, budget);
  }

  @Mutation(() => Category)
  @UseGuards(GqlAuthGuard)
  createCategory(
    @Args() createCategoryDto: CreateCategoryDto,
    @CurrentUser() user: User,
  ): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto, user);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async removeCategory(
    @Args('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ) {
    await this.categoryService.removeCategoryById(id, user);
    return 'Category Removed';
  }

  @Query(() => Number)
  @UseGuards(GqlAuthGuard)
  getCategoryByDescription(
    @Args('description') description: string,
    @CurrentUser() user: User,
  ): Promise<Category> {
    return this.categoryService.getCategoryByDescription(description, user);
  }

  @Query(() => Float)
  @UseGuards(GqlAuthGuard)
  sumCategoryDebits(
    @Args('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ): Promise<number> {
    return this.categoryService.sumCategoryDebits(id, user);
  }

  @Query(() => Float)
  @UseGuards(GqlAuthGuard)
  sumCategoryDebitsByYearMonth(
    @Args('id', ParseIntPipe) id: number,
    @Args('year', ParseIntPipe) year: number,
    @Args('month', ParseIntPipe) month: number,
    @CurrentUser() user: User,
  ) {
    return this.categoryService.sumCategoryDebitsByYearMonth(
      id,
      user,
      year,
      month,
    );
  }

  @Query(() => ChartData)
  @UseGuards(GqlAuthGuard)
  async chartData(
    @Args({ name: 'dates', type: () => [DateInput] }) dates: DateInput[],
    @CurrentUser() user: User,
  ) {
    return this.categoryService.chartData(dates, user);
  }

  @Query(() => ChartData )
  @UseGuards(GqlAuthGuard)
  async MonthlySpendingChart(
    @Args({ name: 'date', type: () => DateInput }) date: DateInput,
    @CurrentUser() user: User,
  ) {
    return this.categoryService.MonthlySpendingChart(date, user);
  }

}
