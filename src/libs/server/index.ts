import { Server } from "./core/Server";
import { Express } from "express";
import { Logger } from "../logging/core/Logger";

interface Config {
  port: number;
}

export class MyExpressServer implements Server {
  private readonly express: Express;
  private readonly config: Config;
  private readonly logger: Logger;

  constructor(express: Express, config: Config, logger: Logger) {
    this.express = express;
    this.config = config;
    this.logger = logger;
  }

  async serve(): Promise<void> {
    this.logger.info("serving MyServer...");
    this.express.listen(this.config, () =>
      this.logger.info("listening on port", this.config.port)
    );
  }
}
