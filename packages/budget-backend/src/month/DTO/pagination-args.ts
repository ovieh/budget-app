import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int)
  @IsInt()
  offset: number;

  @Field(() => Int)
  @IsInt()
  limit: number;
}
