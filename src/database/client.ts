import { Logger } from "../logger/logger";

export interface Client {
  connect: () => Promise<void>;
}

export class PostgreSQLClient implements Client {
  private readonly logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  async connect(): Promise<void> {
    this.logger.debug("connecting...");
    return;
  }
}
