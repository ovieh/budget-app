import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { CategoryService } from '../category/category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionRepository } from './transaction.repository';
import { CategoryRepository } from '../category/category.repository';
import { AuthModule } from '../auth/auth.module';
import { TransactionResolver } from './transaction.resolver';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionRepository, CategoryRepository]),
    AuthModule,
    CategoryModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService, TransactionResolver, CategoryService],
})
export class TransactionModule {}
