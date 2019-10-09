import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as uuidv4 from 'uuid/v4';

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  'Transaction Date': string;

  @Column()
  'Transaction Type': string;

  @Column()
  'Sort Code': string;

  @Column()
  'Account Number': string;

  @Column('text')
  'Transaction Description': string;

  @Column('money')
  'Debit Amount': string;

  @Column('money')
  'Credit Amount': string;

  @Column('money')
  'Balance': string;

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }
}
