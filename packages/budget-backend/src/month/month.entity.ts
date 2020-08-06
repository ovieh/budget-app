import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { Transaction } from '../transaction/transaction.entity';
import { ObjectType, Int, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Month extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => Int)
  @Column('int')
  month: number;

  @Column('int')
  year: number;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @OneToMany(() => Transaction, (transaction) => transaction.month, {
    eager: true,
  })
  transactions?: Transaction[];

  @Field(() => String)
  @Column('date')
  date: Date;

  @Column()
  userId: number;
}
