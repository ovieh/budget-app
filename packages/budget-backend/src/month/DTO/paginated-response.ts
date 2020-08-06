import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class PaginatedResponse {
    @Field(() => Int)
    page: number;

    @Field(() => Int)
    limit: number;

    @Field(() => Int)
    totalCount: number;

    @Field(() => Int)
    pageCount: number;


}