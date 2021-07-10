import { Handler } from "./Handler";

export interface Subscriber<E> {
  subscribe: (handler: Handler<E>) => Promise<void>;
}
