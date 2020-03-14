import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()

export class YearMonth {
    @Field(() => Int)
    year: number;

    @Field(() => Int)
    month: number;
}
