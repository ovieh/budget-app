import { IsInt, IsNotEmpty } from "class-validator";
import { ArgsType, Field, Int, ID } from "@nestjs/graphql";
import { Transaction } from "src/transaction/transaction.entity";
import { Category } from "src/category/category.entity";

@ArgsType()
export class CreateMonthDto {
    @Field(() => Int)
    @IsInt()
    month: number;

    @Field(() => Int)
    @IsInt()
    year: number;

    @Field(() => ID)
    @IsNotEmpty()
    transaction: Transaction;

    @Field(() => [Category])
    @IsNotEmpty()
    category: Category[];
}