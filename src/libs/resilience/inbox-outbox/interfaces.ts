export interface Publisher<E extends Event> {
  publish: (event: E) => Promise<void>;
}

export interface Consumer<E extends Event> {
  consume: () => Promise<E>;
}

export interface Event {
  id: string;
  name: string;

  correlationId: string;
  date: number;
}
