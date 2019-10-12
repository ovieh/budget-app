import { Module } from '@nestjs/common';
import { FileuploadModule } from './fileupload/fileupload.module';
import { TypeOrmModule} from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TransactionModule } from './transaction/transaction.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig),
  FileuploadModule,
  TransactionModule,
  CategoryModule],
})
export class AppModule {
}
