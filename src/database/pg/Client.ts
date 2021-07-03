import { Logger } from "../../logging/core/Logger";
import { Client } from "../core/Client";

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
  private readonly config: Config;
  private readonly logger: Logger;

  constructor(config: Config, logger: Logger) {
    this.config = config;
    this.logger = logger;
  }

  async connect(): Promise<void> {
    this.logger.debug("connecting...");
    return Promise.resolve();
  }
}
