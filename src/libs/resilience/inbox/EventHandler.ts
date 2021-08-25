import { TransactionalClient } from "../../database/core/Client";
import { Logger } from "../../logging/core/Logger";
import { Event, EventStatus, EventHandler, EventPublisher } from "./interfaces";

// todo: needs a better name
export class InboxEventHandler implements EventHandler<Event> {
  private readonly client: TransactionalClient;
  private readonly publisher: EventPublisher;
  private readonly logger: Logger;

  constructor(
    client: TransactionalClient,
    publisher: EventPublisher,
    logger: Logger
  ) {
    this.client = client;
    this.publisher = publisher;
    this.logger = logger;
  }

  async handle(event: Event): Promise<void> {
    try {
      this.logger.debug(
        `marking event ${event.id} as ${EventStatus.PROCESSING}`
      );
      this.client.exec(
        "UPDATE inbox SET status = 'processing' WHERE id = $1",
        event.id
      );

      await this.publisher.publishEvent(event);

      this.logger.debug(
        `marking event ${event.id} as ${EventStatus.PROCESSED}`
      );
      await this.client.exec(
        "UPDATE inbox SET status = $1 WHERE id = $2",
        EventStatus.PROCESSED,
        event.id
      );
    } catch (err) {
      this.logger.warn(`unable to process event ${event.id}`);

      this.logger.debug(`marking event ${event.id} as ${EventStatus.FAILED}`);

      await this.client.exec(
        "UPDATE inbox SET status = $1 WHERE id = $2",
        EventStatus.FAILED,
        event.id
      );
    }
  }
}
