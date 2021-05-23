import { Logger } from "../../../logger/logger";
import { Consumer, Event } from "../interfaces";

export class InboxConsumer implements Consumer<Event> {
  private readonly logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  async consume(): Promise<Event> {
    this.logger.debug("consuming event from inbox");

    return Promise.resolve({
      id: "id",
      correlationId: "correlationId",
      date: Date.now(),
      name: "event",
    });
  }
}
