import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { AuthModule } from '../auth/auth.module';
import { CategoryResolver } from './category.resolver';
import { JSONObjectScalar } from './JSONObject.scalar';
@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryRepository]),
    AuthModule,
  ],
  providers: [CategoryService, CategoryResolver, JSONObjectScalar],
  controllers: [CategoryController],
})
export class CategoryModule {}
