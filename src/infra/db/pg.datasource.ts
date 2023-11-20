import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

export const PgDataSource = new DataSource({
  url: process.env.PG_URI,
  type: 'postgres',
  entities: [`${__dirname}/entities/*.entity.{ts,js}`],
  migrations: [`${__dirname}/migrations/*.ts`],
  migrationsRun: false,
  migrationsTableName: 'migrations',
  migrationsTransactionMode: 'all',
  synchronize: false,
  logging: false,
});
