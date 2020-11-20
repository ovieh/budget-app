import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MonthRepository } from './month.repository';
import { User } from 'src/auth/user.entity';
import { Month } from './month.entity';
import { CreateMonthDto } from './DTO/create-month.dto';
import { DateDto } from './DTO/date.dto';
import { UpdateMonthCategoriesDto } from './DTO/update-month-categories.dto';

@Injectable()
export class MonthService {
  private logger = new Logger('MonthService');
  constructor(
    @InjectRepository(MonthRepository)
    private monthRepository: MonthRepository,
  ) {}

  async createMonth(
    createMonthDto: CreateMonthDto,
    userId: number,
  ): Promise<Month> {
    return this.monthRepository.createMonth(createMonthDto, userId);
  }

  async getMonths(user: User): Promise<Month[]> {
    return this.monthRepository.find({
      relations: ['categories'],
      where: { userId: user.id },
    });
  }

  async getByIds(ids: number[], userId: number): Promise<Month[]> {
    return this.monthRepository.findByIds(ids, { where: { userId } });
  }

  async getMonthByDate(dateDto: DateDto, userId: number): Promise<Month> {
    const { year, month } = dateDto;

    try {
      const foundMonth = await this.monthRepository.findOne({
        where: { year, month, userId },
        relations: ['categories'],
        
      });

      return foundMonth;
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException('Could not find month');
    }
  }

  async findMonthByDate(dateDto: DateDto, user: User): Promise<Month[]> {
    const { year, month } = dateDto;
    console.log('hiya')

    let defaultDate: Month;

    if (!year && !month) {
      defaultDate = await this.monthRepository.findOne({
        order: { month: 'DESC', year: 'DESC' },
      });
    }

    const result = await this.monthRepository.find({
      relations: ['categories'],
      where: {
        month: month || defaultDate.month,
        year: year || defaultDate.year,
        userId: user.id,
      },
      order: { month: 'DESC', year: 'DESC' },
      skip: 0,
      take: 1,
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



  async updateMonthCategories(
    updateMonthCategoriesDto: UpdateMonthCategoriesDto,
    userId: number,
  ): Promise<Month> {
    try {
      const result = await this.monthRepository.updateMonthCategories(
        updateMonthCategoriesDto,
        userId
      );
      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async saveMonth(months: CreateMonthDto[]) {
    try {
      const month = (await this.monthRepository.save(months)) as Month[];
      return month;
    } catch (error) {
      throw new BadRequestException('Could not save month(s)');
    }
  }
}
