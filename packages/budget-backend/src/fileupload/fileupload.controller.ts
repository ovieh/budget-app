import { Controller, Logger, Post, UseInterceptors, UploadedFile, Get } from '@nestjs/common';
import { FileInterceptor} from '@nestjs/platform-express';
import { UploadCsvDto } from './DTO/upload-csv.dto';

@Controller('fileupload')
export class FileuploadController {
  private logger = new Logger('Fileupload controller');
  // constructor() {}

  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    // this.logger.log(file);
    console.log(file);
  }

  @Get()
  sayHi(): string {
    return 'Hi';
  }

}
