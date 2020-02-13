import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import * as PostGresConnectionStringParser from 'pg-connection-string';
const dbConfig = config.get('db');
const connectionOptions = process.env.DATABASE_URL && PostGresConnectionStringParser.parse(process.env.DATABASE_URL);

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  port: process.env.DATABASE_URL ? connectionOptions.port : dbConfig.port,
  host: process.env.DATABASE_URL ? connectionOptions.host : dbConfig.host,
  username: process.env.DATABASE_URL ? connectionOptions.user : dbConfig.username,
  password: process.env.DATABASE_URL ? connectionOptions.password : dbConfig.password,
  database: process.env.DATABASE_URL ? connectionOptions.database : dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: dbConfig.synchronize,
  logging: ['error'],
};
