import { Logger } from "../../logging/core/Logger";
import { Ticker } from "../retry/ticker";

export interface PollingOptions {
  ticker: Ticker;
  logger: Logger;
}

export const Polled = (options: PollingOptions) => {
  const { logger, ticker } = options;

  return (target: any, key: PropertyKey, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function poll(...args: any[]): Promise<void> {
      originalMethod.bind(this)(...args);
      await ticker.tick();
      await poll.bind(this)(target, key, descriptor);
    };
    return descriptor;
  };
};
