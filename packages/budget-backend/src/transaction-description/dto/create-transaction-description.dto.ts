import { IsString, IsNotEmpty, IsInt, IsOptional } from "class-validator";

export class CreateTransactionDescriptionDto {

    @IsString()
    description: string;

    @IsInt()
    categoryId: number;

    @IsInt()
    @IsOptional()
    userId?: number;
}