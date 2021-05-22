import { Logger } from "../../logger/logger";
import { Ticker } from "./ticker";

// eslint-disable-next-line @typescript-eslint/ban-types
type AnyFunction = (...args: any[]) => any;
type RetriableFunction = (...args: any[]) => Promise<any>;

export class Retriable {
  private readonly limit: number;
  private readonly ticker: Ticker;
  private readonly logger: Logger;

  constructor(limit: number, ticker: Ticker, logger: Logger) {
    this.limit = limit;
    this.ticker = ticker;
    this.logger = logger;
  }

  from(fn: AnyFunction): RetriableFunction {
    const ticker = this.ticker;
    const limit = this.limit;
    let counter = 0;
    const logger = this.logger;
    return async function execute(...args: any[]): Promise<any> {
      try {
        return await fn(...args);
      } catch (err) {
        counter = counter + 1;
        logger.error(`(${counter}/${limit}) - failed:`, (err as Error).message);
        if (counter === limit) throw Error("finished all retries"); // no need for another retry
        await ticker.tick();
        return await execute(...args);
      }
    };
  }
}
