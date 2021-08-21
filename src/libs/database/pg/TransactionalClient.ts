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
    await this.delegate.exec(query, ...parameters);
  }

  async query<Row>(query: string, ...parameters: string[]): Promise<Row[]> {
    return this.delegate.query(query, ...parameters);
  }

  async txExec(query: string, ...parameters: string[]): Promise<void> {
    this.assertClientIsInActiveTransaction();
    await this.delegate.exec(query, ...parameters);
  }

  async txQuery<Row>(query: string, ...parameters: string[]): Promise<Row[]> {
    this.assertClientIsInActiveTransaction();
    return this.delegate.query(query, ...parameters);
  }

  async beginTransaction(): Promise<void> {
    this.logger.debug("beginning transaction...");
    await this.delegate.exec("BEGIN;");
    this.inTransaction = true;
  }

  async commitTransaction(): Promise<void> {
    this.assertClientIsInActiveTransaction();
    this.logger.debug("commiting transaction...");
    await this.delegate.exec("COMMIT;");
    this.inTransaction = false;
  }

  async rollbackTransaction(): Promise<void> {
    this.assertClientIsInActiveTransaction();
    this.logger.debug("rolling back transaction...");
    await this.delegate.exec("ROLLBACK;");
    this.inTransaction = false;
  }

  private assertClientIsInActiveTransaction(): void {
    if (!this.inTransaction) throw Error("client is not in a transaction");
  }
}
