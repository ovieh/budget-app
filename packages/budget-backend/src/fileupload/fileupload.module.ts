import { Module } from '@nestjs/common';
import { FileuploadController } from './fileupload.controller';
import { FileuploadService } from './fileupload.service';
import { TransactionRepository } from '../transaction/transaction.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionRepository]),
    AuthModule,
  ],
  controllers: [FileuploadController],
  providers: [FileuploadService],
})
export class FileuploadModule {}
