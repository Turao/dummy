import { Logger } from "../../../logger/logger";
import { Publisher, Event } from "../interfaces";

export class InboxPublisher implements Publisher<Event> {
  private readonly logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  async publish(event: Event): Promise<void> {
    this.logger.debug("publishing event into inbox", event);
  }
}
