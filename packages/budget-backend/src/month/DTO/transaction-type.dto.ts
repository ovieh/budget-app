import { ArgsType, Field, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsOptional } from 'class-validator';

export enum TransactionType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

registerEnumType(TransactionType, {
  name: 'TransactionType',
  description: 'The supported transaction types'
});

@ArgsType()
export class TransactionTypeDto {
  @Field(() => TransactionType, { nullable: true })
  @IsOptional()
  @IsEnum(TransactionType)
  transactionType: TransactionType;
}
