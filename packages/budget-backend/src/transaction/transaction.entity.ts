import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, BeforeInsert, Unique, ManyToOne } from 'typeorm';
import { Field, ID, ObjectType, Int, InputType, ArgsType } from 'type-graphql';
import { Category } from '../category/category.entity';
import { User } from '../auth/user.entity';

import * as uuidv4 from 'uuid/v4';
import { RelationColumn } from '../helpers';

@ObjectType()
@InputType('TransactionInput')
@Entity()
@Unique(['date', 'balance'])
export class  Transaction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(type => ID)
  id: string;

  @Column('date')
  @Field()
  date: string;

  @Column()
  @Field()
  type: string;

  @Column()
  @Field()
  sortCode: string;

  @Column()
  @Field()
  accountNumber: string;

  @Column('text')
  @Field()
  description: string;

  @Column('numeric', { precision: 10, scale: 2 })
  @Field()
  debitAmount: number;

  @Column('numeric', { precision: 10, scale: 2 })
  @Field()
  creditAmount: number;

  @Column('numeric', { precision: 10, scale: 2 })
  @Field()
  balance: number;

  @ManyToOne(type => Category, category => category.transaction, { eager: false })
  @Field(type => Category, {nullable: true})
  category: Category;
  @RelationColumn()
  categoryId?: number;

  @ManyToOne(type => User, user => user.transaction, { eager: false })
  @Field(type => User)
  user: User;

  @Column()
  @Field(type => ID)
  userId: number;

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }
}
