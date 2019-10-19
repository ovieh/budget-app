import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { Category } from './category.entity';
import { CreateCategoryDto } from 'src/transaction/DTO/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
    user: User,
    ): Promise<Category> {
    return await this.categoryRepository.createCategory(createCategoryDto, user);
  }

  async findAll(
    user: User,
  ): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async getCategoryById(
    id: number,
    user: User,
    ): Promise<Category> {
    return await this.categoryRepository.findOne(id);
  }
}
