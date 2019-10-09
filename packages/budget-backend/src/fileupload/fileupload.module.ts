import { Module } from '@nestjs/common';
import { FileuploadController } from './fileupload.controller';
import { FileuploadService } from './fileupload.service';
import { TransactionRepository } from '../transaction/transaction.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionRepository]),
  ],
  controllers: [FileuploadController],
  providers: [FileuploadService],
})
export class FileuploadModule {}
