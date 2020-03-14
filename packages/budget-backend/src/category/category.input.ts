import { Transaction } from '../transaction/transaction.entity';
import { User } from '../auth/user.entity';
import { BaseEntity } from 'typeorm';
import { InputType, Field, ID, Float } from '@nestjs/graphql';

@InputType()
export class CategoryInput extends BaseEntity{

  @Field(() => ID)
  id: number;

  @Field(() => String, {nullable: true})
  name: string;

  @Field(() => Float, {nullable: true})
  budget: number;

  @Field(() => Transaction, {nullable: true})
  transaction: Transaction;

  @Field(() => User, {nullable: true})
  user: User;
}
