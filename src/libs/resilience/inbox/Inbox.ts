import { Logger } from "../../logging/core/Logger";
import {
  Event,
  EventEnqueuer,
  EventPublisher,
  PollingWorker,
} from "../interfaces";

export class Inbox implements EventPublisher {
  private readonly enqueuer: EventEnqueuer;
  private readonly pollingWorker: PollingWorker;
  private readonly logger: Logger;

  constructor(
    enqueuer: EventEnqueuer,
    pollingWorker: PollingWorker,
    logger: Logger
  ) {
    this.enqueuer = enqueuer;
    this.pollingWorker = pollingWorker;
    this.logger = logger;
  }

  async open(): Promise<void> {
    await this.pollingWorker.startPolling();
  }

  async close(): Promise<void> {
    await this.pollingWorker.stopPolling();
  }

  async publishEvent<E extends Event>(event: E): Promise<void> {
    this.logger.debug("publishing event");
    await this.enqueuer.enqueueEvent(event);
  }
}
