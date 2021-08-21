import { Logger } from "../../logging/core/Logger";
import { Client } from "../core/Client";
import { ConnectionDetails } from "../core/Connection";

import { Client as PGClient } from "pg";

export class PostgreSQLClient implements Client {
  private readonly delegate: PGClient;
  private readonly logger: Logger;

  constructor(connection: ConnectionDetails, logger: Logger) {
    this.logger = logger;

    this.delegate = new PGClient({
      ssl: connection.ssl,
      host: connection.host,
      port: connection.port,
      database: connection.database,
      user: connection.user,
      password: connection.password,
    });
  }

  async connect(): Promise<void> {
    this.logger.debug("connecting...");
    await this.delegate.connect();
  }

  async disconnect(): Promise<void> {
    this.logger.debug("disconnecting...");
    await this.delegate.end();
  }

  async exec(query: string, ...parameters: string[]): Promise<void> {
    this.logger.debug(query, parameters);
    await this.delegate.query(query, [...parameters]);
  }

  async query<Row>(query: string, ...parameters: string[]): Promise<Row[]> {
    this.logger.debug(query, parameters);
    const result = await this.delegate.query<Row>(query, [...parameters]);
    return result.rows;
  }
}
