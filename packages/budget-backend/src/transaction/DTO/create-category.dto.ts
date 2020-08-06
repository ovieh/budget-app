import { IsNotEmpty, IsAlpha, IsNumber} from 'class-validator';
import { Float, Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class CreateCategoryDto {
  @Field(() => String)
  @IsNotEmpty()
  @IsAlpha()
  name: string;

  @Field(() => Float)
  @IsNumber()
  budget: number;

}
