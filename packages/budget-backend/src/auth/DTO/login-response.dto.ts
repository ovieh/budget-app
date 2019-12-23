import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class LoginResponseDto {
  @Field()
  accessToken: string;
}
