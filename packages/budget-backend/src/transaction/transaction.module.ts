import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CategoryService } from '../category/category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionRepository } from './transaction.repository';
import { CategoryRepository } from '../category/category.repository';
import { AuthModule } from '../auth/auth.module';
import { TransactionResolver } from './transaction.resolver';
import { CategoryModule } from '../category/category.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from '@ovieh/nestjs-dataloader';
import { TransactionLoader } from './transaction.loader.';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionRepository, CategoryRepository]),
    AuthModule,
    CategoryModule,
  ],
  providers: [
    TransactionService,
    TransactionResolver,
    CategoryService,
    TransactionLoader,
    { provide: APP_INTERCEPTOR, useClass: DataLoaderInterceptor },
  ],
})
export class TransactionModule {}
