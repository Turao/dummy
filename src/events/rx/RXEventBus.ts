import { Subject } from "rxjs";
import { Logger } from "../../logging/core/Logger";

export class RXEventBus {
  private readonly bus: Record<string, Subject<any>>;
  private readonly logger: Logger;

  constructor(logger: Logger) {
    this.bus = {};
    this.logger = logger;
  }

  get<E>(eventName: string): Subject<E> {
    this.logger.debug("gettings events of type", eventName);

    const events = this.bus[eventName];
    if (!events) {
      this.bus[eventName] = new Subject<E>();
    }

    return this.bus[eventName] as Subject<E>;
  }
}
