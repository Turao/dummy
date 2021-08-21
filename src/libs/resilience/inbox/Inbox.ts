import { TransactionalClient } from "../../database/core/Client";
import { Logger } from "../../logging/core/Logger";
import {
  Event,
  EventDequeuer,
  // EventDequeuer,
  EventEnqueuer,
  EventHandler,
  EventPublisher,
} from "./interfaces";

export class Inbox implements EventPublisher {
  private readonly enqueuer: EventEnqueuer;
  private readonly dequeuer: EventDequeuer;
  private readonly eventHandler: EventHandler<Event>; // todo: I don't like having a base interface here

  private pollingInterval: NodeJS.Timeout | undefined;
  private readonly logger: Logger;

  constructor(
    enqueuer: EventEnqueuer,
    dequeuer: EventDequeuer,
    eventHandler: EventHandler<Event>,
    logger: Logger
  ) {
    this.enqueuer = enqueuer;
    this.dequeuer = dequeuer;
    this.eventHandler = eventHandler;

    this.pollingInterval = undefined;
    this.logger = logger;
  }

  async start(): Promise<void> {
    if (this.pollingInterval === undefined) {
      this.logger.debug("starting inbox polling...");
      this.pollingInterval = setInterval(this.pollEvent.bind(this), 2000);
    }
  }

  async stop(): Promise<void> {
    if (this.pollingInterval) {
      this.logger.debug("stopping inbox polling...");
      clearInterval(this.pollingInterval);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  async publishEvent<E extends Event>(event: E): Promise<void> {
    this.logger.debug("publishing event");
    await this.enqueuer.enqueueEvent(event);
  }

  async pollEvent(): Promise<void> {
    this.logger.debug("polling for inbox event");
    const event = await this.dequeuer.dequeueEvent();

    if (event === null) {
      return;
    }

    await this.eventHandler.handle(event);
  }
}

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
      "SELECT * FROM inbox WHERE status = 'pending' ORDER BY date ASC LIMIT 1 FOR UPDATE"
    );

    if (events.length === 0) {
      return null;
    }

    return events[0];
  }
}

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
