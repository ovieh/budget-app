import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository])],
  // controllers: [TransactionController],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
