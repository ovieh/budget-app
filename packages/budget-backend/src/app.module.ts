import { Module } from '@nestjs/common';
import { FileuploadController } from './fileupload/fileupload.controller';

@Module({
  imports: [],
  controllers: [FileuploadController],
})
export class AppModule {}
