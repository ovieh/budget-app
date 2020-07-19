import { Module } from '@nestjs/common';
import { FileuploadController } from './fileupload.controller';
import { FileuploadService } from './fileupload.service';
import { TransactionRepository } from '../transaction/transaction.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { FileuploadResolver } from './fileupload.resolver';
import { TransactionService } from 'src/transaction/transaction.service';
import { CategoryService } from 'src/category/category.service';
import { CategoryRepository } from 'src/category/category.repository';
import { MonthService } from 'src/month/month.service';
import { MonthRepository } from 'src/month/month.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionRepository, CategoryRepository, MonthRepository]),
    AuthModule,
  ],
  controllers: [FileuploadController],
  providers: [FileuploadService, FileuploadResolver, TransactionService, CategoryService, MonthService],
})
export class FileuploadModule {}
