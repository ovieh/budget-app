import { Controller, Logger, Post, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { FileInterceptor} from '@nestjs/platform-express';
import { FileuploadService } from './fileupload.service';
import { User } from '../auth/user.entity';
import { CurrentUser, GetUser } from '../auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('fileupload')
@UseGuards(AuthGuard())
export class FileuploadController {
  constructor(
    private fileuploadService: FileuploadService,
    ) {}

  // TODO: handle errors here
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Buffer,
    @GetUser() user: User,
  ): Promise<string> {
    // console.log(`===================GET UUSER ${user}`)
    try {
      await this.fileuploadService.importFile(file, user);

    } catch (error) {
      return `failed`;
    }
    return `File Uploaded`;
  }

}
