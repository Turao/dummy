import { Logger } from "../../logging/core/Logger";
import {
  Event,
  EventDequeuer,
  EventHandler,
  PollingWorker,
} from "./interfaces";

export class InboxPollingWorker implements PollingWorker {
  private readonly dequeuer: EventDequeuer;
  private readonly eventHandler: EventHandler<Event>; // todo: I don't like using the base class here
  private timeout: NodeJS.Timeout | undefined;
  private readonly logger: Logger;

  constructor(
    dequeuer: EventDequeuer,
    eventHandler: EventHandler<Event>,
    logger: Logger
  ) {
    this.dequeuer = dequeuer;
    this.eventHandler = eventHandler;
    this.logger = logger;
  }

  async startPolling(): Promise<void> {
    if (this.timeout) return;
    this.timeout = setInterval(this.poll.bind(this), 2000); // todo: make poll interval configurable
  }

  async stopPolling(): Promise<void> {
    if (!this.timeout) return;
    clearInterval(this.timeout);
  }

  private async poll(): Promise<void> {
    this.logger.debug("polling inbox event");
    const event = await this.dequeuer.dequeueEvent();

    if (event === null) {
      return;
    }

    await this.eventHandler.handle(event);
  }
}
