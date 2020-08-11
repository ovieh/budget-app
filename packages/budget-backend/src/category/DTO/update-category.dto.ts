import { IsNotEmpty } from "class-validator";
import { Category } from "../category.entity";
import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class UpdateCategoryDto {
    @IsNotEmpty()
    @Field(() => [Category])
    categories: Category[];
}