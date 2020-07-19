import { EntityRepository, Repository } from 'typeorm';
import { Month } from './month.entity';
import { Logger } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { CreateMonthDto } from './DTO/create-month.dto';

@EntityRepository(Month)
export class MonthRepository extends Repository<Month> {
  private logger = new Logger('Month Repository');

  // Create Month
  async createMonth(
    createMonthDto: CreateMonthDto,

    user: User,
  ): Promise<Month> {
    const { month: monthDto, year, transaction } = createMonthDto;

    const month = new Month();

    month.month = monthDto;
    month.year = year;
    month.userId = user.id;
    month.transactions = [transaction];
    month.date = new Date(transaction.date);

    try {
      await month.save();
      return month;
    } catch (error) {
      this.logger.error(error);
    }
  }



  // Read Month

  // Read Month by Id

  // Update Month (maybe give an array of all months to be updated)

  // Delete Month
}
