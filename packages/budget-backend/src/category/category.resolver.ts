import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Category } from './category.entity';
import { Logger, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CurrentUser } from '../auth/get-user.decorator';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { User } from '../auth/user.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from '../transaction/DTO/create-category.dto';
import { Float } from 'type-graphql';
import { DateInput } from './date.input';
import { ChartData } from './chartData.output';

@Resolver(of => Category)
export class CategoryResolver {
  private logger = new Logger('Category Resolver');
  constructor(private readonly categoryService: CategoryService) {}

  @Query(returns => Category)
  @UseGuards(GqlAuthGuard)
  getTransactionsByCategory(
    @Args('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ): Promise<Category> {
    return this.categoryService.getCategoryById(id, user);
  }

  @Query(returns => [Category])
  @UseGuards(GqlAuthGuard)
  getCategories(@CurrentUser() user: User): Promise<Category[]> {
    return this.categoryService.findAll(user);
  }

  @Mutation(returns => Category)
  @UseGuards(GqlAuthGuard)
  updateCategory(
    @Args('id') id: number,
    @Args('name') name: string,
    @Args('budget') budget: number,
    @CurrentUser() user: User,
  ): Promise<Category> {
    return this.categoryService.updateCategory(id, user, name, budget);
  }

  @Mutation(returns => Category)
  @UseGuards(GqlAuthGuard)
  createCategory(
    @Args() createCategoryDto: CreateCategoryDto,
    @CurrentUser() user: User,
  ): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto, user);
  }

  @Mutation(returns => String)
  @UseGuards(GqlAuthGuard)
  async removeCategory(
    @Args('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ) {
    await this.categoryService.removeCategoryById(id, user);
    return 'Category Removed';
  }

  @Query(returns => Category)
  @UseGuards(GqlAuthGuard)
  getCategoryByDescription(
    @Args('description') description: string,
    @CurrentUser() user: User,
  ): Promise<Category> {
    return this.categoryService.getCategoryByDescription(description, user);
  }

  @Query(returns => Float)
  @UseGuards(GqlAuthGuard)
  sumCategoryDebits(
    @Args('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ): Promise<number> {
    return this.categoryService.sumCategoryDebits(id, user);
  }

  @Query(returns => Float)
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

  @Query(returns => ChartData)
  @UseGuards(GqlAuthGuard)
  async chartData(
    @Args({ name: 'dates', type: () => [DateInput] }) dates: DateInput[],
    @CurrentUser() user: User,
  ) {
    const categories = await this.categoryService.findAll(user);

    const byDate = dates.map(async ({ year, month }, index) => {
      let obj = {};
      const spendingByCategories = categories.map(async (category, index) => {
        const result = await this.categoryService.sumCategoryDebitsByYearMonth(
          category.id,
          user,
          year,
          month,
        );

        obj = {
          ...obj,
          name: `${month}/${year}`,
          [category.name]: result,
        };
        if (Object.keys(obj).length === categories.length ) return obj;
        
      });

      return await Promise.all(spendingByCategories).then(result => {
        return result.filter(el => el !== undefined)
      });
    });

    return await Promise.all(byDate).then(result => ({payload: result.flat()}));
    
  }
}
