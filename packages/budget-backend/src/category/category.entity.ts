import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm';
import { Transaction } from '../transaction/transaction.entity';

@Entity()
@Unique(['name'])
export class Category extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => Transaction, transaction => transaction.name, { eager: true })
  transaction: Transaction;

}
