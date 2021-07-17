import { Logger } from "../../../logging/core/Logger";
import { Event, Publisher } from "../interfaces";

export class OutboxPublisher implements Publisher<Event> {
  private readonly logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  async publish(event: Event): Promise<void> {
    this.logger.debug("publishing event into outbox", event);
  }
}
