import { Logger } from "../../logging/core/Logger";
import { Event, EventPublisher } from "../interfaces";

export class RabbitMQPublisher implements EventPublisher {
  private readonly logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  async publishEvent<E extends Event>(event: E): Promise<void> {
    this.logger.debug(`publishing event ${event.id}`);
  }
}
