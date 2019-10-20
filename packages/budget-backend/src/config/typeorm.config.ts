import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import * as PostGresConnectionStringParser from 'pg-connection-string';
const dbConfig = config.get('db');
const connectionOptions = process.env.DATABASE_URL && PostGresConnectionStringParser.parse(process.env.DATABASE_URL);

// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: dbConfig.type,
//   port: process.env.DATA_URL ? connectionOptions.port : dbConfig.port,
//   host: process.env.DATA_URL ? connectionOptions.host : dbConfig.host,
//   username: process.env.DATA_URL ? connectionOptions.user : dbConfig.username,
//   password: process.env.DATA_URL ? connectionOptions.password : dbConfig.password,
//   database: process.env.DATA_URL ? connectionOptions.database : dbConfig.database,
//   entities: [__dirname + '/../**/*.entity.{js,ts}'],
//   synchronize: dbConfig.synchronize,
// };

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  url: process.env.DATA_URL,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: dbConfig.synchronize,
};
