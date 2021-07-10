export type Handler<E> = (event: E) => Promise<void>;

export interface Subscriber<E> {
  subscribe: (handler: Handler<E>) => Promise<void>;
}
