import { ArgsType, Field, ID, Int } from "@nestjs/graphql";
import { IsNumber } from "class-validator";

@ArgsType()
export class GetMonthByCategoryDto {
    @Field(() => Int)
    @IsNumber()
    month: number;

    @Field(() => Int)
    @IsNumber()
    year: number;

    @Field(() => Int)
    @IsNumber()
    categoryId: number;
}