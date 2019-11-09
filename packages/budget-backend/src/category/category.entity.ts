import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, ManyToOne } from 'typeorm';
import { Transaction } from '../transaction/transaction.entity';
import { User } from '../auth/user.entity';

@Entity()
@Unique(['name'])
export class Category extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('numeric', { precision: 10, scale: 2 })
  budget: number;

  @OneToMany(type => Transaction, transaction => transaction.name, { eager: true })
  transaction: Transaction;

  @ManyToOne(type => User, user => user.category, { eager: false })
  user: User;
}
