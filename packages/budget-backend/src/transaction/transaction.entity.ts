import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as uuidv4 from 'uuid/v4';

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  transactionDate: string;

  @Column()
  transactionType: string;

  @Column()
  sortCode: string;

  @Column()
  accountNumber: string;

  @Column('text')
  transactionDescription: string;

  @Column('money')
  debitAmount: string;

  @Column('money')
  creditAmount: string;

  @Column('money')
  balance: string;

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }
}
