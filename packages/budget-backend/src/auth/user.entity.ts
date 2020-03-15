import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Transaction } from '../transaction/transaction.entity';
import { Category } from '../category/category.entity';
import { ObjectType, InputType, Field, ID, HideField } from '@nestjs/graphql';

@ObjectType()
@InputType('UserInput')
@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  username: string;

  @HideField()
  @Column()
  password: string;

  @HideField()
  @Column()
  salt: string;

  @HideField()
  @Column('int', { default: 0 })
  tokenVersion: string;

  @HideField()
  @OneToMany(() => Transaction, transaction => transaction.user)
  transaction: Transaction[];

  @HideField()
  @OneToMany(() => Category, category => category.user)
  category: Category[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
