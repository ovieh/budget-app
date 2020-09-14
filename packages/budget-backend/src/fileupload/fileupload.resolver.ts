import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { FileuploadService } from './fileupload.service';
import { CurrentUser } from 'src/auth/get-user.decorator';
import { User } from '../auth/user.entity';
// import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { UploadScalar } from './upload.scalar';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Resolver()
export class FileuploadResolver {
  constructor(
    private readonly fileuploadService: FileuploadService,
  ) {}

  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard)
  uploadFile(
    @CurrentUser() user: User,
    @Args('file') file: UploadScalar,
  ): boolean {
    // this.fileuploadService.importFile(file, user);
    return true;
  }
}
