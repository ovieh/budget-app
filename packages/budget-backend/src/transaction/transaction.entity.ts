import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, BeforeInsert, Unique, ManyToOne } from 'typeorm';
import { Category } from '../category/category.entity';
import { User } from '../auth/user.entity';

import * as uuidv4 from 'uuid/v4';

@Entity()
@Unique(['transactionDate', 'balance'])
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('date')
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

  @ManyToOne(type => User, user => user.transaction, { eager: false })
  user: User;

  @Column()
  userId: number;

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }
}
