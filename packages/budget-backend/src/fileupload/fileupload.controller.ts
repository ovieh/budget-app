import { Controller, Logger, Post, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { FileInterceptor} from '@nestjs/platform-express';
import { FileuploadService } from './fileupload.service';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('fileupload')
@UseGuards(AuthGuard())
export class FileuploadController {
  constructor(
    private fileuploadService: FileuploadService,
    ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Buffer,
    @GetUser() user: User,
  ) {
    this.fileuploadService.importFile(file, user);
  }

}
