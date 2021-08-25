import { TransactionalClient } from "../../database/core/Client";
import { Logger } from "../../logging/core/Logger";
import { Event, EventEnqueuer } from "./interfaces";

export class InboxEnqueuer implements EventEnqueuer {
  private readonly client: TransactionalClient;
  private readonly logger: Logger;

  constructor(client: TransactionalClient, logger: Logger) {
    this.client = client;
    this.logger = logger;
  }

  async enqueueEvent<E extends Event>(event: E): Promise<void> {
    this.logger.debug("enqueuing event", event);
    await this.client.txExec(
      "INSERT INTO inbox VALUES ($1, $2, $3, $4, $5)",
      event.id,
      event.correlationId,
      event.name,
      event.date,
      "pending"
    );
  }
}
