import { Logger } from "../../logging/core/Logger";
import { TransactionalClient } from "../core/Client";
import { PostgreSQLClient } from "./Client";

export class PostgreSQLTransactionalClient implements TransactionalClient {
  private readonly delegate: PostgreSQLClient;
  private inTransaction: boolean;
  private readonly logger: Logger;

  constructor(delegate: PostgreSQLClient, logger: Logger) {
    this.delegate = delegate;
    this.inTransaction = false;
    this.logger = logger;
  }

  async connect(): Promise<void> {
    this.delegate.connect();
  }

  async disconnect(): Promise<void> {
    this.delegate.disconnect();
  }

  async exec(query: string, ...parameters: string[]): Promise<void> {
    try {
      this.assertClientIsInActiveTransaction();
      await this.delegate.exec(query, ...parameters);
    } catch (err) {
      this.logger.warn(err);
    }
  }

  async query<Row>(query: string, ...parameters: string[]): Promise<Row[]> {
    try {
      this.assertClientIsInActiveTransaction();
      return this.delegate.query(query, ...parameters);
    } catch (err) {
      this.logger.warn(err);
      return [];
    }
  }

  async beginTransaction(): Promise<void> {
    try {
      this.logger.debug("beginning transaction...");
      await this.delegate.exec("BEGIN;");
      this.inTransaction = true;
    } catch (err) {
      this.logger.warn(err);
    }
  }

  async commitTransaction(): Promise<void> {
    try {
      this.assertClientIsInActiveTransaction();
      this.logger.debug("commiting transaction...");
      await this.delegate.exec("COMMIT;");
    } catch (err) {
      this.logger.warn(err);
    } finally {
      this.inTransaction = false;
    }
  }

  async rollbackTransaction(): Promise<void> {
    try {
      this.assertClientIsInActiveTransaction();
      this.logger.debug("rolling back transaction...");
      await this.delegate.exec("ROLLBACK;");
    } catch (err) {
      this.logger.warn(err);
    } finally {
      this.inTransaction = false;
    }
  }

  private assertClientIsInActiveTransaction(): void {
    if (!this.inTransaction) throw Error("client is not in a transaction");
  }
}
