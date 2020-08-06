import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  limit?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  page?: number;
}
