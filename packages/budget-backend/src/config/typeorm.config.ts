import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'budget',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
