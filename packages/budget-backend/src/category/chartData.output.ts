import { BaseEntity } from "typeorm";
import { JSONObject } from "./JSONObject.scalar";
import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class ChartData extends BaseEntity {
  @Field()
  payload: JSONObject
}