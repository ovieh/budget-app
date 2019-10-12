import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity()
@Unique(['category'])
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @OneToMany(type => Transaction, transaction => transaction.category, { eager: true})
  transaction: Transaction;
}
