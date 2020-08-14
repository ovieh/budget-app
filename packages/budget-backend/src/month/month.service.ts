import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MonthRepository } from './month.repository';
import { User } from 'src/auth/user.entity';
import { Month } from './month.entity';
import { CreateMonthDto } from './DTO/create-month.dto';
import { DateDto } from './DTO/date.dto';
import { GetMonthByCategoryDto } from './DTO/get-month-by-category.dto';
import { Category } from 'src/category/category.entity';
import { UpdateCategoryDto } from 'src/category/DTO/update-category.dto';

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
    return this.monthRepository.find({
      relations: ['categories'],
      where: { userId: user.id },
    });
  }

  async getByIds(ids: number[], user: User): Promise<Month[]> {
    return this.monthRepository.findByIds(ids, { where: { userId: user.id } });
  }

  async getMonthByDate(dateDto: DateDto, user: User): Promise<Month> {
    const { year, month } = dateDto;

    const foundMonth = this.monthRepository.findOne(
      {
        year,
        month,
        userId: user.id,
      },
      { relations: ['categories'] },
    );

    if (!foundMonth) throw new NotFoundException('Month not found');

    return foundMonth;
  }

  async findMonthByDate(dateDto: DateDto, user: User): Promise<Month[]> {
    const { year, month } = dateDto;

    let defaultDate: Month;

    if (!year && !month) {
      defaultDate = await this.monthRepository.findOne({
        order: { month: 'DESC', year: 'DESC' },
      });
    }

    const result = await this.monthRepository.find({
      where: {
        month: month || defaultDate.month,
        year: year || defaultDate.year,
        userId: user.id,
      },
      order: { month: 'DESC', year: 'DESC' },
      // skip: skippedItems,
      // take: limit,
      relations: ['categories'],
    });

    if (!result) throw new NotFoundException('Month not found');

    return result;
  }

  async sortedMonths(user: User): Promise<Month[]> {
    return this.monthRepository.find({
      where: { userId: user.id },
      order: { year: 'DESC', month: 'DESC' },
    });
  }

  // get category by month
  // async categoryByMonth(
  //   getMonthByCategoryDto: GetMonthByCategoryDto,
  //   user: User,
  // ): Promise<Month[]> {
  //   return this.monthRepository.categoryByMonth(getMonthByCategoryDto, user);
  // }

  async updateMonthCategories(
    monthId: string,
    updateCategoryDto: UpdateCategoryDto,
    user: User,
  ): Promise<Month> {
    try {
      const result = await this.monthRepository.updateMonthCategories(
        monthId,
        updateCategoryDto,
        user,
      );
      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
