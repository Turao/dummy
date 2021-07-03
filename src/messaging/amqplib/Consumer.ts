import { Logger } from "../../logging/core/Logger";
import { Consumer } from "../core/Consumer";

export interface Config {
  exchange: string;
  routingKey: string;
  queue: string;
}

export class AMQPConsumer<Message> implements Consumer<Message> {
  private readonly config: Config;
  private readonly logger: Logger;

  constructor(config: Config, logger: Logger) {
    this.config = config;
    this.logger = logger;
  }

  onMessage(message: Message): void {
    this.logger.debug(`consuming message: ${message}`);
  }
}
