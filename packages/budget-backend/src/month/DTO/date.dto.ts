import { IsInt, IsOptional } from 'class-validator';
import { ArgsType, Int, Field } from '@nestjs/graphql';
import { PaginationArgs } from './pagination-args';

@ArgsType()
export class DateDto extends PaginationArgs {
  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  year?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  month?: number;
}
