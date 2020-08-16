import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Category } from 'src/category/category.entity';
import { ObjectType, InputType } from '@nestjs/graphql';

@ObjectType()
@InputType('transaction_description')
@Entity()
@Unique(['description'])
export class TransactionDescription extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20 })
  description: string;

  @ManyToOne(() => Category, (category) => category.transactionDescriptions)
  category: Category;

  @Column()
  categoryId: number;
}
