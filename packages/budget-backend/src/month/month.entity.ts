import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
  Unique,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { Transaction } from '../transaction/transaction.entity';
import { ObjectType, Int, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
@Unique(['year', 'month'])
export class Month extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Int)
  @Column('int')
  month: number;

  @Column('int')
  year: number;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @OneToMany(() => Transaction, (transaction) => transaction.month)
  transactions?: Transaction[];

  @Column()
  userId: number;
}
