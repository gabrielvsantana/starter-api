import { DataSource, ObjectLiteral, ObjectType, QueryRunner, Repository } from 'typeorm';

import { logger } from '@/infra/logger';

import { ConnectionNotFoundError, TransactionNotFoundError } from './db.errors';
import { DbTransaction } from './db.types';
import { PgDataSource } from './pg.datasource';

export class PgConnection implements DbTransaction {
  private static instance?: PgConnection;
  private query?: QueryRunner;
  private connection?: DataSource;

  private constructor() {}

  static getInstance(): PgConnection {
    if (PgConnection.instance === undefined) PgConnection.instance = new PgConnection();
    return PgConnection.instance;
  }

  async connect(): Promise<void> {
    if (this.connection?.isInitialized) return;

    logger.info('Database :: Connecting...');
    this.connection = await PgDataSource.initialize();
    logger.info('Database :: Connected');
  }

  async disconnect(): Promise<void> {
    if (this.connection === undefined) throw new ConnectionNotFoundError();
    logger.info('Database :: Disconnecting...');
    await this.connection.destroy();
    this.query = undefined;
    this.connection = undefined;
    logger.info('Database :: Disconnected');
  }

  async openTransaction(): Promise<void> {
    if (this.connection === undefined) throw new ConnectionNotFoundError();
    this.query = this.connection.createQueryRunner();
    await this.query.startTransaction();
  }

  async closeTransaction(): Promise<void> {
    if (this.query === undefined) throw new TransactionNotFoundError();
    await this.query.release();
  }

  async commit(): Promise<void> {
    if (this.query === undefined) throw new TransactionNotFoundError();
    await this.query.commitTransaction();
  }

  async rollback(): Promise<void> {
    if (this.query === undefined) throw new TransactionNotFoundError();
    await this.query.rollbackTransaction();
  }

  getRepository<Entity extends ObjectLiteral>(entity: ObjectType<Entity>): Repository<Entity> {
    if (this.connection === undefined) throw new ConnectionNotFoundError();
    if (this.query !== undefined) return this.query.manager.getRepository(entity);
    return PgDataSource.getRepository(entity);
  }
}
