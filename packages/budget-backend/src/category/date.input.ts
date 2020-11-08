import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class DateInput {
  @Field(() => Int)
  year: number;

  @Field(() => Int)
  month: number;

}