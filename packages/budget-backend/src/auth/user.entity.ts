import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Transaction } from '../transaction/transaction.entity';
import { Category } from '../category/category.entity';
import { ObjectType, ID, Field, InputType } from 'type-graphql';

@ObjectType()
@InputType('UserInput')
@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
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

  @OneToMany(type => Transaction, transaction => transaction.user)
  @Field(type => Transaction)
  transaction: Transaction[];

  @OneToMany(type => Category, category => category.user)
  @Field(type => Category)
  category: Category[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
