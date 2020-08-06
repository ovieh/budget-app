import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MonthRepository } from './month.repository';
import { User } from 'src/auth/user.entity';
import { Month } from './month.entity';
import { CreateMonthDto } from './DTO/create-month.dto';
import { DateDto } from './DTO/date.dto';
import { Category } from 'src/category/category.entity';
import { CategoryInput } from 'src/category/category.input';
import { CategoryDto } from 'src/category/DTO/category.dto';
import { MonthPaginated } from './DTO/month-paginated';
import { GetMonthByCategoryDto } from './DTO/get-month-by-category.dto';
import { getEnabledCategories } from 'trace_events';

@Injectable()
export class MonthService {
  constructor(
    @InjectRepository(MonthRepository)
    private monthRepository: MonthRepository,
  ) {}

  async createMonth(
    createMonthDto: CreateMonthDto,
    user: User,
  ): Promise<Month> {
    return this.monthRepository.createMonth(createMonthDto, user);
  }

  async getMonths(user: User): Promise<Month[]> {
    return this.monthRepository.find({ where: { userId: user.id } });
  }

  async getByIds(ids: number[], user: User): Promise<Month[]> {
    return this.monthRepository.findByIds(ids, { where: { userId: user.id } });
  }

  async findMonthByDate(dateDto: DateDto, user: User): Promise<Month[]> {
    const { year, month } = dateDto;

    let defaultDate: Month;

    if (!year && !month) {
      defaultDate = await this.monthRepository.findOne({
        order: { month: 'DESC', year: 'DESC' },
      });
    }

    // const totalCount = await this.monthRepository.count();

    // const skippedItems = (dateDto.page - 1) * dateDto.limit;

    if (!defaultDate && !year && !month) return [];

    const result = await this.monthRepository.find({
      where: {
        month: month || defaultDate.month,
        year: year || defaultDate.year,
        userId: user.id,
      },
      order: { date: 'DESC' },
      // skip: skippedItems,
      // take: limit,
      relations: ['categories'],
    });

    if (!result) throw new NotFoundException('Month not found');

    // return {
    //   totalCount,
    //   page,
    //   limit,
    //   pageCount: Math.ceil(totalCount / limit),
    //   data: result
    // }

    return result;
  }

  async sortedMonths(user: User): Promise<Month[]> {
    return this.monthRepository.find({
      where: { userId: user.id },
      order: { year: 'DESC', month: 'DESC' },
    });
  }

  // get category by month
  async categoryByMonth(
    getMonthByCategoryDto: GetMonthByCategoryDto,
    user: User,
  ): Promise<Month[]> {
    return this.monthRepository.categoryByMonth(getMonthByCategoryDto, user);
  }
}
