import { IsDate, IsNotEmpty, IsCurrency, IsNumber, IsString} from 'class-validator';
import { ArgsType, Field, Float } from '@nestjs/graphql';

@ArgsType()
export class CreateTransactionDto {
  @Field(() => String)
  @IsString()
  date: string;
  
  @Field(() => String)
  @IsString()
  type: string;

  @Field(() => String)
  @IsString()
  sortCode: string;

  @Field(() => String)
  @IsString()
  accountNumber: string;

  @Field(() => String)
  @IsString()
  description: string;

  @Field(() => Float)
  @IsNumber()  
  debitAmount: number;

  @Field(() => Float)
  @IsNumber()  
  creditAmount: number;

  @Field(() => Float)
  @IsNumber()  
  balance: number;

}
