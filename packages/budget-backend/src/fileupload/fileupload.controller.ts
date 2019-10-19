import { Controller, Logger, Post, UseInterceptors, UploadedFile, Get } from '@nestjs/common';
import { FileInterceptor} from '@nestjs/platform-express';
import { UploadCsvDto } from './DTO/upload-csv.dto';
import { FileuploadService } from './fileupload.service';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';
// import { TransactionService } from 'src/transaction/transaction.service';

@Controller('fileupload')
export class FileuploadController {
  private logger = new Logger('Fileupload controller');
  constructor(
    // private transactionService: TransactionService,
    private fileuploadService: FileuploadService,
    ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file,
    @GetUser() user: User,
  ) {
    // this.logger.log(file);
    this.fileuploadService.importFile(file, user);
    console.log(user)
  }

  @Get()
  sayHi(): string {
    return 'Hi';
  }

}
