import { BaseEntity } from "typeorm";
import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class DateInput extends BaseEntity {
  @Field(() => Int)
  year: number;

  @Field(() => Int)
  month: number;

}