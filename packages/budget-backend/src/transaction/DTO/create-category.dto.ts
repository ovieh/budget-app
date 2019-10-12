import { IsNotEmpty, IsAlpha} from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsAlpha()
  name: string;
}
