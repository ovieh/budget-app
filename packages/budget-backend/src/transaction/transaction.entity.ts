import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as uuidv4 from 'uuid/v4';

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('date')
  transactionDate: string;

  @Column()
  sortcode: string;

  @Column()
  accountNumber: number;

  @Column('text')
  description: string;

  @Column('money')
  debitAmount: number;

  @Column('money')
  creditAmount: number;

  @Column('money')
  balance: number;

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }
}
