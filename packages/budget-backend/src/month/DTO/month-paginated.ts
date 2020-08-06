import { PaginatedResponse } from './paginated-response';
import { Month } from '../month.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class MonthPaginated extends PaginatedResponse {
  @Field(() => [Month])
  data: Month[];
}
