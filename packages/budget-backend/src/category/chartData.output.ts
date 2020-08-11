import { BaseEntity } from 'typeorm';
import { GraphQLJSON } from 'graphql-type-json';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ChartData extends BaseEntity {
  @Field(() => GraphQLJSON, { nullable: true })
  payload: unknown;
}
