export type EventStatus = "pending" | "processing" | "processed";

export interface Event {
  id: string;
  name: string;

  correlationId: string;
  date: string;
}
export interface EventPublisher {
  publishEvent: <E extends Event>(event: E) => Promise<void>;
}

export interface Subscriber {
  subscribe: <E extends Event>(handler: EventHandler<E>) => Promise<void>;
}

export interface EventHandler<E extends Event> {
  handle: (event: E) => Promise<void>;
}

export interface EventEnqueuer {
  enqueueEvent: <E extends Event>(event: E) => Promise<void>;
}

export interface EventDequeuer {
  dequeueEvent: <E extends Event>() => Promise<E | null>;
}

export interface PollingWorker {
  startPolling: () => Promise<void>;
  stopPolling: () => Promise<void>;
}
