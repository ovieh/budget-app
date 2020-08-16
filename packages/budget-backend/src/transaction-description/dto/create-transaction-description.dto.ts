import { IsString, IsNumber } from "class-validator";
import { Category } from "src/category/category.entity";

export class CreateTransactionDescriptionDto {

    @IsString()
    description: string;

    @IsNumber()
    category: Category;
}