import { UpdateCategoryDto } from 'src/category/DTO/update-category.dto';
import { IsNotEmpty } from 'class-validator';
import { Month } from '../month.entity';
import { Category } from 'src/category/category.entity';
import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class UpdateMonthCategoriesDto {
  @IsNotEmpty()
  month: Month;

  @IsNotEmpty()
  categories: Category[];
}
