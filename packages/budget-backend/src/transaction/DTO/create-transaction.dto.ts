import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsAlpha, IsCurrency} from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsDate()
  transactionDate: string;

  @IsNotEmpty()
  transactionType: string;

  @IsNotEmpty()
  sortCode: string;

  @IsNotEmpty()
  accountNumber: string;

  @IsNotEmpty()
  transactionDescription: string;

  @IsCurrency()
  @IsNotEmpty()
  debitAmount: number;

  @IsCurrency()
  @IsNotEmpty()
  creditAmount: number;

  @IsCurrency()
  @IsNotEmpty()
  balance: number;

}
