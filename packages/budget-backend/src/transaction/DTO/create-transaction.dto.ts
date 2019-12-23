import { IsDate, IsNotEmpty, IsCurrency} from 'class-validator';
import { ArgsType, Field, Float, ObjectType } from 'type-graphql';

@ArgsType()
export class CreateTransactionDto {
  @Field(type => String)
  @IsNotEmpty()
  @IsDate()
  transactionDate: string;

  @IsNotEmpty()
  @Field(type => String)
  transactionType: string;

  @Field(type => String)
  @IsNotEmpty()
  sortCode: string;

  @Field(type => String)
  @IsNotEmpty()
  accountNumber: string;

  @IsNotEmpty()
  @Field(type => String)
  transactionDescription: string;

  @Field(type => Float)
  @IsCurrency()
  @IsNotEmpty()
  debitAmount: number;

  @Field(type => Float)
  @IsCurrency()
  @IsNotEmpty()
  creditAmount: number;

  @Field(type => Float)
  @IsCurrency()
  @IsNotEmpty()
  balance: number;

}
