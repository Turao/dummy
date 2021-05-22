import { Logger } from "../logger/logger";

export interface Server {
  serve: () => Promise<void>;
}

export class AppServer implements Server {
  private readonly logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  serve(): Promise<void> {
    this.logger.info("serving application...");
    return Promise.resolve();
  }
}
