import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('UploadFileType')
export class UploadFileType {
  @Field()
  success: boolean;
}
