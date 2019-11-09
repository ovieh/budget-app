import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { Category } from './category.entity';
import { CreateCategoryDto } from '../transaction/DTO/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { log } from 'util';

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
    return await this.categoryRepository.getCategories(user);
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

  async updateCategory(
    id: number,
    user: User,
    name: string,
    budget: number,
  ): Promise<Category> {
    const category = await this.getCategoryById(id, user);

    category.name = name;
    category.budget = budget;

    await category.save();
    return category;

  }

  async getCategoryByDescription(
    description: string,
    user: User,
  ): Promise<Category> {
    // const found = await this.categoryRepository.findOne({ where: { userId: user.id }});
    // if (!found) {
    //   throw new NotFoundException(`Category with ${description} not found`);
    // }
    // // console.log(description);
    // return found;
    return this.categoryRepository.getCategoryByDescription(description, user);
  }

  async removeCategoryById(
    id: number,
    user: User,
  ): Promise<void> {
    return this.categoryRepository.removeCategoryById(id, user);
  }

}
