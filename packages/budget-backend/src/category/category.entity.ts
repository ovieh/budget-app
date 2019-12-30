import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Transaction } from '../transaction/transaction.entity';
import { User } from '../auth/user.entity';
import {
  ObjectType,
  Field,
  ID,
  Float,
  InputType,
} from 'type-graphql';

@ObjectType()
@InputType('CatIn')
@Entity()
@Unique(['name'])
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(type => ID, { nullable: true })
  id: number;

  @Column()
  @Field(type => String)
  name: string;

  @Column('numeric', { precision: 10, scale: 2 })
  @Field(type => Float, { nullable: true })
  budget: number;

  @OneToMany(
    type => Transaction,
    transaction => transaction.category,
    { eager: true },
  )
  @Field(type => [Transaction], { nullable: true })
  transaction: Transaction;

  @ManyToOne(
    type => User,
    user => user.category,
    { eager: false },
  )
  @Field(type => User, { nullable: true })
  user: User;
}
