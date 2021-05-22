import { Logger } from "../logger/logger";

export interface Client {
  publish: (message: unknown) => Promise<void>;
  consume: () => Promise<void>;
}

export class AMQPClient implements Client {
  private readonly logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  async consume(): Promise<void> {
    return;
  }

  async publish(message: unknown): Promise<void> {
    this.logger.debug("publishing message", message);
    const res = await Promise.resolve();
    this.logger.debug("published");
    return res;
  }
}
