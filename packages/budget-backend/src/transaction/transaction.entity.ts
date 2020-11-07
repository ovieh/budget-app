import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  Unique,
  ManyToOne,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { User } from '../auth/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { ObjectType, InputType, Field, ID, HideField } from '@nestjs/graphql';
import { Month } from '../month/month.entity';

@ObjectType()
@InputType('TransactionInput')
@Entity()
@Unique(['date', 'balance'])
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('date')
  date: string;

  @Column()
  type: string;

  @Column()
  sortCode: string;

  @Column()
  accountNumber: string;

  @Column('text')
  description: string;

  @Column('numeric', { precision: 10, scale: 2 })
  debitAmount: number;

  @Column('numeric', { precision: 10, scale: 2 })
  creditAmount: number;

  @Column('numeric', { precision: 10, scale: 2 })
  balance: number;

  @ManyToOne(() => Category, (category) => category.transactions, {
    eager: true,
  })
  category: Category;
  // @RelationColumn()
  // categoryId?: number;

  @HideField()
  @ManyToOne(() => Month, (month) => month.transactions)
  month: Month;

  @HideField()
  @ManyToOne(() => User, (user) => user.transaction)
  user: User;

  @Column()
  userId: number;

  @BeforeInsert()
  addId(): void {
    this.id = uuidv4();
  }
}
