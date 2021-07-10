import { Logger } from "../../logging/core/Logger";
import { Handler, Subscriber } from "../core/Subscriber";
import { RXEventBus } from "./RXEventBus";

export class RXSubscriber<E> implements Subscriber<E> {
  private readonly eventName: string;
  private readonly bus: RXEventBus;
  private readonly logger: Logger;

  constructor(eventName: string, bus: RXEventBus, logger: Logger) {
    this.eventName = eventName;
    this.bus = bus;
    this.logger = logger;
  }

  async subscribe(handler: Handler<E>): Promise<void> {
    this.logger.debug("subscribing to events from:", this.eventName);
    this.bus.get<E>(this.eventName).subscribe({
      next: (event: E) => handler(event),
    });
  }
}
