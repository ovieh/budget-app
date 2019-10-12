import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { Category } from './category.entity';
import { CreateCategoryDto } from 'src/transaction/DTO/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoryRepository.createCategory(createCategoryDto);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }
}
