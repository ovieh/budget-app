import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import * as PostGresConnectionStringParser from 'pg-connection-string';
import { IConfig } from '../types';
const dbConfig = config.get<IConfig>('db');
const connectionOptions =
  process.env.DATABASE_URL &&
  PostGresConnectionStringParser.parse(process.env.DATABASE_URL);

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  port: process.env.DATABASE_URL
    ? parseInt(connectionOptions.port, 10)
    : dbConfig.port,
  host: process.env.DATABASE_URL ? connectionOptions.host : dbConfig.host,
  username: process.env.DATABASE_URL
    ? connectionOptions.user
    : dbConfig.username,
  password: process.env.DATABASE_URL
    ? connectionOptions.password
    : dbConfig.password,
  database: process.env.DATABASE_URL
    ? connectionOptions.database
    : dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: ['src/migration/**/*.ts'],
  cli: {
    migrationsDir: 'src/migration',
  },
  synchronize: true, //dbConfig.synchronize,
  // logging: ['error'],
  cache: false,
  ssl: dbConfig.ssl,
};
