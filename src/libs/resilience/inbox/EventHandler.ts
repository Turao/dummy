import { TransactionalClient } from "../../database/core/Client";
import { Logger } from "../../logging/core/Logger";
import { Event, EventHandler } from "./interfaces";

export class InboxEventHandler implements EventHandler<Event> {
  private readonly client: TransactionalClient;
  private readonly logger: Logger;

  constructor(client: TransactionalClient, logger: Logger) {
    this.client = client;
    this.logger = logger;
  }

  async handle(event: Event): Promise<void> {
    try {
      this.logger.debug("marking event as processing");
      this.client.exec(
        "UPDATE inbox SET status = 'processing' WHERE id = $1",
        event.id
      );
      await new Promise((resolve) => setTimeout(resolve, 3000));
      this.logger.debug("publishing event via amqp wire");
    } catch (err) {
      this.logger.warn("unable to process event", event.id);
    } finally {
      this.logger.debug("marking event as pending");
      this.client.exec(
        "UPDATE inbox SET status = 'pending' WHERE id = $1",
        event.id
      );
    }
  }
}
