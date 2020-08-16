import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionDescriptionService } from './transaction-description.service';
import { TransactionDescriptionRepository } from './transaction-description.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionDescriptionRepository])],
  providers: [TransactionDescriptionService],
})
export class TransactionDescriptionModule {}
