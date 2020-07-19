import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthService } from './month.service';
import { MonthRepository } from './month.repository';
import { MonthResolver } from './month.resolver';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([MonthRepository]),
    AuthModule,
  ],
  providers:[
    MonthService,
    MonthResolver
  ],
})
export class MonthModule {}
