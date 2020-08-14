import {
  Resolver,
  Mutation,
  Args,
  Query,
  Int,
} from '@nestjs/graphql';
import { Month } from './month.entity';
import { Logger, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { MonthService } from './month.service';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CurrentUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateMonthDto } from './DTO/create-month.dto';
import { DateDto } from './DTO/date.dto';
import { GetMonthByCategoryDto } from './DTO/get-month-by-category.dto';
import { UpdateCategoryDto } from 'src/category/DTO/update-category.dto';

@Resolver(() => Month)
export class MonthResolver {
  private logger = new Logger('Month Resolver');
  constructor(private readonly monthService: MonthService) {}

  @Mutation(() => Month)
  @UseGuards(GqlAuthGuard)
  async createMonth(
    @Args() createMonthDto: CreateMonthDto,
    @CurrentUser() user: User,
  ): Promise<Month> {
    return this.monthService.createMonth(createMonthDto, user);
  }

  @Query(() => [Month])
  @UseGuards(GqlAuthGuard)
  async getMonths(@CurrentUser() user: User): Promise<Month[]> {
    return this.monthService.getMonths(user);
  }

  @Query(() => [Month])
  @UseGuards(GqlAuthGuard)
  async getMonthByIds(
    @Args('ids', { type: () => [Int] }) ids: number[],
    @CurrentUser() user: User,
  ): Promise<Month[]> {
    return this.monthService.getByIds(ids, user);
  }

  @Query(() => [Month])
  @UseGuards(GqlAuthGuard)
  async sortedMonths(@CurrentUser() user: User): Promise<Month[]> {
    return this.monthService.sortedMonths(user);
  }

  @Query(() => [Month])
  @UseGuards(GqlAuthGuard)
  async MonthByDate(
    @CurrentUser() user: User,
    @Args() dateDto: DateDto,
  ): Promise<Month[]> {
    return this.monthService.findMonthByDate(dateDto, user);
  }

  // @Query(() => [Month])
  // @UseGuards(GqlAuthGuard)
  // async MonthByCategory(
  //   @Args() getMonthByCategoryDto: GetMonthByCategoryDto,
  //   @CurrentUser() user: User,
  // ): Promise<Month[]> {
  //   return this.monthService.categoryByMonth(getMonthByCategoryDto, user);
  // }

  @Mutation(() => Month)
  @UseGuards(GqlAuthGuard)
  async updateMonthCategories(
    @CurrentUser() user: User,
    @Args('monthId', ParseUUIDPipe) monthId: string,
    @Args() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Month> {
    return this.monthService.updateMonthCategories(
      monthId,
      updateCategoryDto,
      user,
    );
  }
}
