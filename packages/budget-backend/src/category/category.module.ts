import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';
import { AuthModule } from '../auth/auth.module';
import { CategoryResolver } from './category.resolver';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from '@ovieh/nestjs-dataloader';
import { CategoryLoader } from './category.loader';
@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository]), AuthModule],
  providers: [
    CategoryService,
    CategoryResolver,
    CategoryLoader,
    { provide: APP_INTERCEPTOR, useClass: DataLoaderInterceptor },
  ],
  exports: [CategoryService]
})
export class CategoryModule {}
