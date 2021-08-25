import { TransactionalClient } from "../../database/core/Client";
import { Logger } from "../../logging/core/Logger";
import { Event, EventDequeuer } from "./interfaces";

export class InboxDequeuer implements EventDequeuer {
  private readonly client: TransactionalClient;
  private readonly logger: Logger;

  constructor(client: TransactionalClient, logger: Logger) {
    this.client = client;
    this.logger = logger;
  }

  async dequeueEvent<E extends Event>(): Promise<E | null> {
    this.logger.debug("dequeueing event");
    const events = await this.client.query<E>(
      "SELECT * FROM inbox WHERE status = 'pending' ORDER BY date ASC LIMIT 1 FOR UPDATE SKIP LOCKED"
    );

    if (events.length === 0) {
      return null;
    }

    return events[0];
  }
}
