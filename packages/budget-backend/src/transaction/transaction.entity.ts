import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, BeforeInsert, Unique, ManyToOne } from 'typeorm';
import { Field, ID, ObjectType, InputType } from 'type-graphql';
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
  @Field(() => ID)
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

  @ManyToOne(() => Category, category => category.transaction)
  @Field(() => Category, {nullable: true})
  category: Category;
  @RelationColumn()
  categoryId?: number;

  @ManyToOne(() => User, user => user.transaction)
  @Field(() => User)
  user: User;

  @Column()
  @Field(() => ID)
  userId: number;

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }
}
