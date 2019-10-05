import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsAlpha, IsCurrency} from 'class-validator';

export class UploadCsvDto {
  @IsNotEmpty()
  @IsDate()
  transactionDate: string;

  @IsNotEmpty()
  transactionType: string;

  @IsNotEmpty()
  sortCode: string;

  @IsNotEmpty()
  @IsNumber()
  accountNumber: number;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsCurrency()
  debitAmount: number;

  @IsOptional()
  @IsCurrency()
  creditAmount: number;

  @IsNotEmpty()
  @IsCurrency()
  balance: number;
}
