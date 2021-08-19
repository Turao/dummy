import { Logger } from "../../logging/core/Logger";
import { Client } from "../core/Client";
import { Connection } from "../core/Connection";

import { Client as PGClient } from "pg";

export interface Config {
  host: string;
  port: number;

  database: string;

  user: string;
  password: string;
}

export const defaults: Config = {
  host: "localhost",
  port: 5432,
  database: "postgres",
  user: "user",
  password: "password",
};

export const env: Config = {
  host: process.env.DATABASE_HOST as string,
  port: Number(process.env.DATABASE_PORT),
  database: process.env.DATABASE_DATABASE as string,
  user: process.env.DATABASE_USER as string,
  password: process.env.DATABASE_PASSWORD as string,
};

export class PostgreSQLClient implements Client {
  private readonly delegate: PGClient;
  private readonly logger: Logger;

  constructor(connection: Connection, logger: Logger) {
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
