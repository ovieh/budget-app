import DataLoader = require('dataloader');
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from '@ovieh/nestjs-dataloader';
import { Transaction } from './transaction.entity';
import { TransactionService } from './transaction.service';

@Injectable()
export class TransactionLoader implements NestDataLoader<string, Transaction> {
  constructor(private readonly transactionService: TransactionService) {}

  generateDataLoader(): DataLoader<string, Transaction> {
      return new DataLoader<string, Transaction>((keys: string[]) => this.transactionService.findByIds(keys));
  }
}
