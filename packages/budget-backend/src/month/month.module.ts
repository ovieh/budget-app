import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthService } from './month.service';
import { MonthRepository } from './month.repository';
import { MonthResolver } from './month.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([MonthRepository]),
    AuthModule,
    CategoryModule,
  ],
  providers:[
    MonthService,
    MonthResolver,
  ],
  exports: [MonthService]
})
export class MonthModule {}
