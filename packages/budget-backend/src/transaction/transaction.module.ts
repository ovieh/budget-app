import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { CategoryService } from '../category/category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionRepository } from './transaction.repository';
import { CategoryRepository } from '../category/category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionRepository, CategoryRepository])],
  controllers: [TransactionController],
  providers: [TransactionService, CategoryService],
})
export class TransactionModule {}
