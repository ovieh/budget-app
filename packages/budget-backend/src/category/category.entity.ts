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
import { ObjectType, InputType, Field, ID, Float, HideField } from "@nestjs/graphql";

@ObjectType()
@InputType('CatIn')
@Entity()
@Unique(['name'])
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { nullable: true })
  id: number;

  @Column({ default: 'uncategorized' })
  @Field(() => String)
  name: string;

  @Column('numeric', { precision: 10, scale: 2 })
  @Field(() => Float, { nullable: true })
  budget: number;

  @HideField()
  @OneToMany(() => Transaction, 
    transaction => transaction.category,
    { eager: true },
  )
  transaction?: Transaction;

  @HideField()
  @ManyToOne(
    () => User,
    user => user.category,
    { eager: false },
  )
  @HideField()
  user: User;
}
