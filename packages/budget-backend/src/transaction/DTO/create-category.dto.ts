import { IsNotEmpty, IsAlpha, IsCurrency} from 'class-validator';
import { ArgsType, Field, Float } from 'type-graphql';

@ArgsType()
export class CreateCategoryDto {
  @Field(type => String)
  @IsNotEmpty()
  @IsAlpha()
  name: string;

  @Field(type => Float)
  @IsCurrency()
  budget: number;

}
