export interface Handler<E> {
  handle: (event: E) => Promise<void>;
}
