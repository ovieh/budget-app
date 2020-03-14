import { IsDate, IsNotEmpty, IsCurrency} from 'class-validator';
import { ArgsType, Field, Float } from '@nestjs/graphql';

@ArgsType()
export class CreateTransactionDto {
  @Field(() => String)
  @IsNotEmpty()
  @IsDate()
  date: string;

  @IsNotEmpty()
  @Field(() => String)
  type: string;

  @Field(() => String)
  @IsNotEmpty()
  sortCode: string;

  @Field(() => String)
  @IsNotEmpty()
  accountNumber: string;

  @IsNotEmpty()
  @Field(() => String)
  description: string;

  @Field(() => Float)
  @IsCurrency()
  @IsNotEmpty()
  debitAmount: number;

  @Field(() => Float)
  @IsCurrency()
  @IsNotEmpty()
  creditAmount: number;

  @Field(() => Float)
  @IsCurrency()
  @IsNotEmpty()
  balance: number;

}
