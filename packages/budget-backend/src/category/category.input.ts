import { Transaction } from '../transaction/transaction.entity';
import { User } from '../auth/user.entity';
import { Field, ID, Float, InputType } from 'type-graphql';
import { BaseEntity } from 'typeorm';

@InputType()
export class CategoryInput extends BaseEntity{

  @Field(type => ID)
  id: number;

  @Field(type => String, {nullable: true})
  name: string;

  @Field(type => Float, {nullable: true})
  budget: number;

  @Field(type => Transaction, {nullable: true})
  transaction: Transaction;

  @Field(type => User, {nullable: true})
  user: User;
}
