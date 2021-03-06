import * as DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { NestDataLoader } from '@ovieh/nestjs-dataloader';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Injectable()
export class CategoryLoader implements NestDataLoader<number, Category> {
  constructor(private readonly categoryService: CategoryService) {}

  generateDataLoader(): DataLoader<number, Category> {
    return new DataLoader<number, Category>(async (keys: number[]) => {
      const data = await this.categoryService.findByIds(keys);
      return keys.map(key => data.find((entity: Category) => entity.id === key));
    });
  }
}
