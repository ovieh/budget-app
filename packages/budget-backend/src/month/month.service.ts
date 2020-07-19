import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MonthRepository } from './month.repository';
import { User } from 'src/auth/user.entity';
import { Month } from './month.entity';
import { CreateMonthDto } from './DTO/create-month.dto';
import { DateDto } from './DTO/date.dto';
import { off } from 'process';

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
    const { year, month, limit, offset } = dateDto;

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
      order: { date: 'DESC' },
      skip: offset,
      take: limit,
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

  // get latest month, paginate throw each element
}
