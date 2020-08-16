import { EntityRepository, Repository } from 'typeorm';
import { TransactionDescription } from './transaction-description.entity';

@EntityRepository(TransactionDescription)
export class TransactionDescriptionRepository extends Repository<
  TransactionDescription
> {}
