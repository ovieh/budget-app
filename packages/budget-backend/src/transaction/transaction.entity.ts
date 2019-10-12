import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, BeforeInsert, Unique, ManyToOne } from 'typeorm';
import { Category } from '../category/category.entity';
import * as uuidv4 from 'uuid/v4';

@Entity()
@Unique(['transactionDate', 'balance'])
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  transactionDate: string;

  @Column()
  transactionType: string;

  @Column()
  sortCode: string;

  @Column()
  accountNumber: string;

  @Column('text')
  transactionDescription: string;

  @Column('money')
  debitAmount: number;

  @Column('money')
  creditAmount: number;

  @Column('money')
  balance: number;

  @ManyToOne(type => Category, category => category.transaction, { eager: false })
  name: Category;

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }
}
