export interface Publisher<E> {
  publish: (event: E) => Promise<void>;
}
