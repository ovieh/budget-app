import { Transaction } from './transaction.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Transaction)
export default class TransactionRepository extends Repository<Transaction> {

}
