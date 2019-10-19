import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Transaction } from '../transaction/transaction.entity';
import { Category } from '../category/category.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(type => Transaction, transaction => transaction.user, { eager: true})
  transaction: Transaction[];

  @OneToMany(type => Category, category => category.user, { eager: true})
  category: Category[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
