import { Logger } from "../../../logging/core/Logger";
import { Consumer, Event } from "../interfaces";

export class OutboxConsumer implements Consumer<Event> {
  private readonly logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  async consume(): Promise<Event> {
    this.logger.debug("consuming event from outbox");

    return Promise.resolve({
      id: "id",
      correlationId: "correlationId",
      date: Date.now(),
      name: "event",
    });
  }
}
