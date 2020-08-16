import { IsNumber, IsString } from "class-validator";

export class UpdateTransactionDescriptionDto {

    @IsNumber()
    categoryId: number;

    @IsString()
    description: string;
}