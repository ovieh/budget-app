import { Controller, Logger, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor} from '@nestjs/platform-express';

@Controller('fileupload')
export class FileuploadController {
  private logger = new Logger('Fileupload controller');
  // constructor() {}

  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    console.log(file);
  }

}
