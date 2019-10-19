import { Module } from '@nestjs/common';
import { FileuploadModule } from './fileupload/fileupload.module';
import { TypeOrmModule} from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TransactionModule } from './transaction/transaction.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig),
  FileuploadModule,
  TransactionModule,
  CategoryModule,
  AuthModule],
})
export class AppModule {
}
