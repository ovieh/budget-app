import { IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { ObjectType, Field } from 'type-graphql';
import { User } from '../user.entity';

@ObjectType()
export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Field(() => User)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  password: string;

}
