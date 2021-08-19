import { Logger } from "../../logging/core/Logger";
import { TransactionalClient } from "../core/Client";
import { PostgreSQLClient } from "./Client";

export class PostgreSQLTransactionalClient implements TransactionalClient {
  private readonly delegate: PostgreSQLClient;
  private readonly logger: Logger;

  constructor(delegate: PostgreSQLClient, logger: Logger) {
    this.delegate = delegate;
    this.logger = logger;
  }

  async connect(): Promise<void> {
    this.delegate.connect();
  }

  async exec(query: string, ...parameters: string[]): Promise<void> {
    this.delegate.exec(query, ...parameters);
  }

  async query<Row>(query: string, ...parameters: string[]): Promise<Row[]> {
    return this.delegate.query(query, ...parameters);
  }

  async beginTransaction(): Promise<void> {
    this.logger.debug("beginning transaction...");
    this.delegate.exec("BEGIN;");
  }

  async commitTransaction(): Promise<void> {
    this.logger.debug("commiting transaction...");
    this.delegate.exec("COMMIT;");
  }

  async rollbackTransaction(): Promise<void> {
    this.logger.debug("rolling back transaction...");
    this.delegate.exec("ROLLBACK;");
  }
}
