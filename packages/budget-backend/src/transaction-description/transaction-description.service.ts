import { Injectable, NotFoundException, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionDescription } from './transaction-description.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDescriptionDto } from './dto/create-transaction-description.dto';
import { TransactionDescriptionRepository } from './transaction-description.repository';
import { UpdateTransactionDescriptionDto } from './dto/update-transaction-description.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TransactionDescriptionService {
  private logger = new Logger("TransactionDescriptionService");
  constructor(
    @InjectRepository(TransactionDescriptionRepository)
    private transactionDescriptionRepository: Repository<
      TransactionDescription
    >,
  ) {}

  findAll(user: User): Promise<TransactionDescription[]> {
    return this.transactionDescriptionRepository.find({ userId: user.id });
  }

  async findTransactionDescription(
    description: string,
    userId: number,
  ): Promise<TransactionDescription> {

    const transactionDescription = await this.transactionDescriptionRepository.findOne(
      { description, userId },
      { relations: ['category'] },
    );
    
    return transactionDescription;
  }

  async createTransactionDescription(
    createTransactionDescriptionDto: CreateTransactionDescriptionDto,
    userId: number,
  ): Promise<TransactionDescription> {
    const { category, description } = createTransactionDescriptionDto;

    const existingDescription = await this.findTransactionDescription(description, userId);

    if (!category) {
      throw new Error("CATEOGRY DOES NOT EXIST!!!!")
    }

    if (existingDescription) {
      return existingDescription;
    };

    const transactionDescription = new TransactionDescription();

    transactionDescription.category = category;
    transactionDescription.description = description;
    transactionDescription.userId = userId;

    try {

      // await transactionDescription.save();
      // this.logger.log(`created new Transaction Description ${transactionDescription.description}`);
      return transactionDescription;
    } catch(error) {
      this.logger.error(error.message);
      throw new BadRequestException('Could not create Transaction Description', error.message);
    }

  }

  async updateTransactionDescription(
    updateTransactionDescriptionDto: UpdateTransactionDescriptionDto,
    user: User,
  ): Promise<TransactionDescription> {
    const { categoryId, description } = updateTransactionDescriptionDto;

    const existing = await this.transactionDescriptionRepository.findOne({
      description,
      userId: user.id,
    });

    if (!existing)
      throw new NotFoundException('Transaction Description not found');

    existing.categoryId = categoryId;

    await existing.save();

    return existing;
  }
}
