import { Logger } from "../../logger/logger";
import { Ticker } from "./ticker";

export interface RetryOptions {
  limit: number;
  ticker: Ticker;
  logger: Logger;
}

export const Retry = (options: RetryOptions) => {
  const { limit, logger, ticker } = options;
  let counter = 0;

  return (target: any, key: PropertyKey, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function execute(...args: any[]): Promise<void> {
      try {
        return await originalMethod.bind(this)(...args);
      } catch (err) {
        counter = counter + 1;
        logger.error(`(${counter}/${limit}) - failed:`, (err as Error).message);
        if (counter === limit) throw Error("finished all retries"); // no need for another retry
        await ticker.tick();
        return await execute.bind(this)(target, key, descriptor);
      }
    };
    return descriptor;
  };
};
