import { InputType, Field } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { UploadFileType } from './file.type';
import { Upload } from './upload.scalar';

@InputType()
export class UploadFileInput {
  @Field()
  @Exclude()
  file: UploadFileType;
}
