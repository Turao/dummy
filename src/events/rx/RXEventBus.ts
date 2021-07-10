import { ReplaySubject } from "rxjs";

export interface Config {
  size: number;
}

export class RXEventBus {
  private readonly bus: Record<string, ReplaySubject<any>>;
  private readonly config: Config;

  constructor(config: Config) {
    this.bus = {};
    this.config = config;
  }

  get<E>(eventName: string): ReplaySubject<E> {
    const events = this.bus[eventName];
    if (!events) {
      this.bus[eventName] = new ReplaySubject<E>(this.config.size);
    }

    return this.bus[eventName] as ReplaySubject<E>;
  }
}
