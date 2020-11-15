import { Module } from '@nestjs/common';
import { FileuploadModule } from './fileupload/fileupload.module';
import { TypeOrmModule} from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { typeOrmConfig } from './config/typeorm.config';
import { TransactionModule } from './transaction/transaction.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { UploadScalar } from './fileupload/upload.scalar';
import { AppController } from './app/app.controller';
import { AuthService } from './auth/auth.service';
import { UserRepository } from './auth/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { MonthModule } from './month/month.module';
import * as config from 'config';
import { join } from 'path';
import { TransactionDescriptionModule } from './transaction-description/transaction-description.module';
import { IConfig } from './types';

const jwtConfig: IConfig = config.get('jwt');

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UploadScalar,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      context: ({ req, res }) => ({ req, res }),
      uploads: {
        maxFileSize: 1000000,
        maxFiles: 1,
      },
      cors: false,
    }),
    FileuploadModule,
    TransactionModule,
    CategoryModule,
    MonthModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_REFRESH_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: '60s',
      },
    }),
    TransactionDescriptionModule,
  ],
  controllers: [AppController],
  providers: [AuthService, UserRepository],
})
export class AppModule {
}
