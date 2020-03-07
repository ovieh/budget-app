import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()

export class YearMonth {
    @Field(type => Int)
    year: number;

    @Field(type => Int)
    month: number;
}
