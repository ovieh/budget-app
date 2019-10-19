import { IsNotEmpty, IsAlpha, IsNumber} from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsAlpha()
  name: string;

  // @IsNumber()
  // userId: number;
}
