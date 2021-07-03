import { Logger } from "../../logging/core/Logger";
import { Publisher } from "../core/Publisher";

export interface Config {
  exchange: string;
  routingKey: string;
}

export class AMQPPublisher<Message> implements Publisher<Message> {
  private readonly config: Config;
  private readonly logger: Logger;

  constructor(config: Config, logger: Logger) {
    this.config = config;
    this.logger = logger;
  }

  async publish(message: Message): Promise<void> {
    this.logger.debug(`publishing message: ${message}`);
  }
}
