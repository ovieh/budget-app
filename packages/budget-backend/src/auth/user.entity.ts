import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Transaction } from '../transaction/transaction.entity';
import { Category } from '../category/category.entity';
import { ObjectType, InputType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@InputType('UserInput')
@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  username: string;

  @Column()
  @Field()
  password: string;

  @Column()
  salt: string;

  @Column('int', { default: 0 })
  tokenVersion: string;

  @OneToMany(() => Transaction, transaction => transaction.user)
  @Field(() => Transaction)
  transaction: Transaction[];

  @OneToMany(() => Category, category => category.user)
  @Field(() => Category)
  category: Category[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
