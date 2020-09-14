import { IsString, IsNotEmpty } from "class-validator";
import { Category } from "src/category/category.entity";

export class CreateTransactionDescriptionDto {

    @IsString()
    description: string;

    @IsNotEmpty()
    category: Category;
}