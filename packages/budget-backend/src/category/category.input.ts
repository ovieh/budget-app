import { Transaction } from '../transaction/transaction.entity';
import { User } from '../auth/user.entity';
import { BaseEntity } from 'typeorm';
import { InputType, Field, ID, Float } from '@nestjs/graphql';

@InputType()
export class CategoryInput extends BaseEntity{
  @Field(() => ID)
  id: number;
  name?: string;
  budget?: number;
  transaction?: Transaction;
  user?: User;
}
