import { Logger } from "../../logging/core/Logger";
import { Migrator } from "../core/Migrator";

import { migrate } from "postgres-migrations";

interface Config {
  host: string;
  port: number;
  database: string;

  user: string;
  password: string;
}

export class PGMigrator implements Migrator {
  private readonly config: Config;
  private readonly logger: Logger;

  constructor(config: Config, logger: Logger) {
    this.config = config;
    this.logger = logger;
  }

  async up(path: string): Promise<void> {
    this.logger.info("starting migrations");
    await migrate(this.config, path);
  }

  async down(path: string): Promise<void> {
    this.logger.info("undoing migrations");
    await migrate(this.config, path);
  }
}
