import { Logger } from "../../logging/core/Logger";
import { Migrator } from "../core/Migrator";

import { migrate } from "postgres-migrations";

interface Config {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;

  // migration files
  path: string;
}

export class PostgreSQLMigrator implements Migrator {
  private readonly config: Config;
  private readonly logger: Logger;

  constructor(config: Config, logger: Logger) {
    this.config = config;
    this.logger = logger;
  }

  async migrate(): Promise<void> {
    this.logger.info("starting migrations...");
    await migrate(this.config, this.config.path);
    this.logger.info("migration finished successfully");
  }
}
