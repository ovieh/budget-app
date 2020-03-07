import { InputType, Field, Int } from "type-graphql";
import { BaseEntity } from "typeorm";

@InputType()
export class DateInput extends BaseEntity {
  @Field(type => Int)
  year: number;

  @Field(type => Int)
  month: number;

}