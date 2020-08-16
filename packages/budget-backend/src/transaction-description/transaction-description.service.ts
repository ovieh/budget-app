import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionDescription } from './transaction-description.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDescriptionDto } from './dto/create-transaction-description.dto';
import { TransactionDescriptionRepository } from './transaction-description.repository';
import { UpdateTransactionDescriptionDto } from './dto/update-transaction-description.dto';

@Injectable()
export class TransactionDescriptionService {
  constructor(
    @InjectRepository(TransactionDescriptionRepository)
    private transactionDescriptionRepository: Repository<
      TransactionDescription
    >,
  ) {}

  findAll(): Promise<TransactionDescription[]> {
    return this.transactionDescriptionRepository.find();
  }

  async createTransactionDescription(
    createTransactionDescriptionDto: CreateTransactionDescriptionDto,
  ): Promise<TransactionDescription> {
    const { category, description } = createTransactionDescriptionDto;

    const existing = await this.transactionDescriptionRepository.findOne({
      description,
    });

    if (existing) return existing;

    const transactionDescription = new TransactionDescription();

    transactionDescription.category = category;
    transactionDescription.description = description;

    await transactionDescription.save();

    return transactionDescription;
  }

  async updateTransactionDescription(
    updateTransactionDescriptionDto: UpdateTransactionDescriptionDto,
  ): Promise<TransactionDescription> {
    const { categoryId, description } = updateTransactionDescriptionDto;

    const existing = await this.transactionDescriptionRepository.findOne({description});

    if (!existing)
      throw new NotFoundException('Transaction Description not found');

    existing.categoryId = categoryId;

    await existing.save();

    return existing;
  }
}
