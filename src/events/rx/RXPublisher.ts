import { Logger } from "../../logging/core/Logger";
import { Publisher } from "../core/Publisher";
import { RXEventBus } from "./RXEventBus";

export class RXPublisher<E> implements Publisher<E> {
  private readonly eventName: string;
  private readonly bus: RXEventBus;
  private readonly logger: Logger;

  constructor(eventName: string, bus: RXEventBus, logger: Logger) {
    this.eventName = eventName;
    this.bus = bus;
    this.logger = logger;
  }

  async publish(event: E): Promise<void> {
    this.logger.debug("publishing event to:", this.eventName);
    const events = this.bus.get(this.eventName);
    events.next(event);
  }
}
