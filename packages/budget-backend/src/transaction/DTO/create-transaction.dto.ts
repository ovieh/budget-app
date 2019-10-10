import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsAlpha, IsCurrency} from 'class-validator';

export class CreateTransaction {
  @IsNotEmpty()
  @IsDate()
  date: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  sortcode: string;

  @IsNotEmpty()
  accountNumber: string;

  @IsNotEmpty()
  description: string;

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
