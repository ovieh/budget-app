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
import { MonthRepository } from '../month/month.repository';
import { MonthService } from '../month/month.service';
import { MonthModule } from '../month/month.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionRepository, CategoryRepository, MonthRepository]),
    AuthModule,
    CategoryModule,
    MonthModule,
  ],
  providers: [
    TransactionService,
    TransactionResolver,
    CategoryService,
    TransactionLoader,
    MonthService,
    { provide: APP_INTERCEPTOR, useClass: DataLoaderInterceptor },
  ],
})
export class TransactionModule {}
