import { Logger } from "../logger/logger";

export interface Client {
  authenticate: () => Promise<void>;
}

export class OAuth2Client implements Client {
  private readonly logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  async authenticate(): Promise<void> {
    this.logger.debug("authenticating...");
    return;
  }
}
