import { Module } from '@nestjs/common';
import { FileuploadModule } from './fileupload/fileupload.module';
import { TypeOrmModule} from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(),
  FileuploadModule],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
