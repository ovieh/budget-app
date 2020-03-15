import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, BeforeInsert, Unique, ManyToOne } from 'typeorm';
import { Category } from '../category/category.entity';
import { User } from '../auth/user.entity';
import * as uuidv4 from 'uuid/v4';
import { RelationColumn } from '../helpers';
import { ObjectType, InputType, Field, ID, HideField } from '@nestjs/graphql';

@ObjectType()
@InputType('TransactionInput')
@Entity()
@Unique(['date', 'balance'])
export class  Transaction extends BaseEntity {
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

  @ManyToOne(() => Category, category => category.transaction)
  category?: Category;
  @RelationColumn()
  categoryId?: number;

  @HideField()
  @ManyToOne(() => User, user => user.transaction)
  user: User;

  @Column()
  userId: number;

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }
}
