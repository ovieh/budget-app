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
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UploadScalar,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
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
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AuthService, UserRepository],
})
export class AppModule {
}
