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
import { ObjectType, Int, Field } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Month extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int, { nullable: true })
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
