import { Logger } from "../../logging/core/Logger";
import { Queue } from "../core/Queue";
import { AMQPClient } from "./Client";

export interface Config {
  name: string;
}

export class AMQPQueue implements Queue {
  private readonly client: AMQPClient;
  private readonly config: Config;
  private readonly logger: Logger;

  constructor(client: AMQPClient, config: Config, logger: Logger) {
    this.client = client;
    this.config = config;
    this.logger = logger;
  }

  async exists(): Promise<boolean> {
    return false;
  }

  async declare(): Promise<void> {
    return;
  }

  async bind(routingKey: string): Promise<void> {
    this.logger.debug(`binding ${this.config.name} using ${routingKey}`);
    return;
  }
}
