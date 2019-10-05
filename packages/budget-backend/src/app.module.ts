import { Module } from '@nestjs/common';
import { FileuploadModule } from './fileupload/fileupload.module';
import { TypeOrmModule} from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig),
  FileuploadModule,
  TransactionModule],
})
export class AppModule {
}
