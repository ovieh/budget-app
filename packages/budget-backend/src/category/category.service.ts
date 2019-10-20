import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { Category } from './category.entity';
import { CreateCategoryDto } from 'src/transaction/DTO/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { Transaction } from 'src/transaction/transaction.entity';

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
    return await this.categoryRepository.find({ where: { userId: user.id }});
  }

  async getCategoryById(
    id: number,
    user: User,
    ): Promise<Category> {
    const found = await this.categoryRepository.findOne({ where: { id, userId: user.id }});
    if (!found) {
      throw new NotFoundException(`Category with ${id} not found`);
    }
    return found;
  }

}
