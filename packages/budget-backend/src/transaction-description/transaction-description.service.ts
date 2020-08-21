import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionDescription } from './transaction-description.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDescriptionDto } from './dto/create-transaction-description.dto';
import { TransactionDescriptionRepository } from './transaction-description.repository';
import { UpdateTransactionDescriptionDto } from './dto/update-transaction-description.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TransactionDescriptionService {
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
    user: User,
  ): Promise<TransactionDescription> {
    return  this.transactionDescriptionRepository.findOne(
      { description, userId: user.id },
      { relations: ['category'] },
    );
  }

  async createTransactionDescription(
    createTransactionDescriptionDto: CreateTransactionDescriptionDto,
    user: User,
  ): Promise<TransactionDescription> {
    const { category, description } = createTransactionDescriptionDto;

    const existing = await this.transactionDescriptionRepository.findOne({
      description,
      userId: user.id,
    });

    if (existing) return existing;

    const transactionDescription = new TransactionDescription();

    transactionDescription.category = category;
    transactionDescription.description = description;
    transactionDescription.userId = user.id;

    await transactionDescription.save();

    return transactionDescription;
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
