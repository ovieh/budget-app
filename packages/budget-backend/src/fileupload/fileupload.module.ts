import { Module } from '@nestjs/common';
import { FileuploadController } from './fileupload.controller';

@Module({
  controllers: [FileuploadController],
})
export class FileuploadModule {}
