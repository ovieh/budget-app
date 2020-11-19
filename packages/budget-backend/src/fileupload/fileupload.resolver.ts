import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { FileuploadService } from './fileupload.service';
import { CurrentUser } from 'src/auth/get-user.decorator';
import { User } from '../auth/user.entity';
// import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { UploadFileInput } from './file.input';
import { UploadFileType } from './file.type';
import { GraphQLUpload } from 'apollo-server-express';
import fs = require('fs');

@Resolver()
export class FileuploadResolver {
  constructor(private readonly fileuploadService: FileuploadService) {}

  @Mutation((): typeof GraphQLUpload => GraphQLUpload, {
    name: 'uploadFile',
    description: 'Upload a file',
    nullable: true,
  })
  @UseGuards(GqlAuthGuard)
  async uploadFile(
    @CurrentUser() user: User,
    @Args({ name: 'file', type: (): typeof GraphQLUpload => GraphQLUpload })
    file: Buffer,
  ) {
    // const fileBuffer = Buffer.from(file, 'base64');
    console.log(file);
    const result = await this.fileuploadService.importFile(file, user);
  }
}

