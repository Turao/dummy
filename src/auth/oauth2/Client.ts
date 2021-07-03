import { Logger } from "../../logging/core/Logger";
import { Client } from "../core/Client";

export interface Config {
  clientId: string;
  clientSecret: string;
}

export const defaults: Config = {
  clientId: "",
  clientSecret: "",
};

export const env: Config = {
  clientId: process.env.AUTH_CLIENT_ID as string,
  clientSecret: process.env.AUTH_CLIENT_SECRET as string,
};

export class OAuth2Client implements Client {
  private readonly config: Config;
  private readonly logger: Logger;

  constructor(config: Config, logger: Logger) {
    this.config = config;
    this.logger = logger;
  }

  async authenticate(): Promise<void> {
    this.logger.debug("authenticating...");
    return Promise.resolve();
  }
}
