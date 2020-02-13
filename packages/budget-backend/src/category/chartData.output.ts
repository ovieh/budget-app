import { ObjectType, Field } from "type-graphql";
import { BaseEntity } from "typeorm";
import { JSONObject } from "./JSONObject.scalar";

@ObjectType()
export class ChartData extends BaseEntity {
  @Field()
  payload: JSONObject
}