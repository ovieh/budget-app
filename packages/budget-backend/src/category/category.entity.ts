import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Transaction } from '../transaction/transaction.entity';
import { User } from '../auth/user.entity';
import {
  ObjectType,
  InputType,
  Field,
  ID,
  Float,
  HideField,
} from '@nestjs/graphql';
import { TransactionDescription } from 'src/transaction-description/transaction-description.entity';

@ObjectType()
@InputType('CatIn')
@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { nullable: true })
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @Column('numeric', { precision: 10, scale: 2 })
  @Field(() => Float, { nullable: true })
  budget: number;

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  @Field(() => [Transaction], { nullable: true })
  transactions?: Transaction[];

  @HideField()
  @ManyToOne(() => User, (user) => user.category, { eager: false })
  user: User;

  @OneToMany(() => TransactionDescription, transactionDescription => transactionDescription.category)
  transactionDescriptions: TransactionDescription[];
}
