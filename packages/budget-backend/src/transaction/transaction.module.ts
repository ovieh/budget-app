import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionRepository } from './transaction.repository';
import { AuthModule } from '../auth/auth.module';
import { TransactionResolver } from './transaction.resolver';
import { CategoryModule } from '../category/category.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from '@ovieh/nestjs-dataloader';
import { TransactionLoader } from './transaction.loader.';
import { MonthModule } from '../month/month.module';
import { TransactionDescriptionModule } from 'src/transaction-description/transaction-description.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionRepository]),
    AuthModule,
    CategoryModule,
    MonthModule,
    TransactionDescriptionModule
  ],
  providers: [
    TransactionService,
    TransactionResolver,
    TransactionLoader,
    // { provide: APP_INTERCEPTOR, useClass: DataLoaderInterceptor },
  ],
})
export class TransactionModule {}
