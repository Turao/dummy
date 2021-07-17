import { Ticker } from "../retry/ticker";

type AnyFunction = (...args: any[]) => any;
type PolledFunction = (...args: any[]) => Promise<any>;

export class Pollable {
  private readonly ticker: Ticker;

  constructor(ticker: Ticker) {
    this.ticker = ticker;
  }

  of<F extends AnyFunction>(fn: F): PolledFunction {
    const { ticker } = this;

    return async function poll(...args: any[]): Promise<any> {
      await fn(...args);
      await ticker.tick();
      return await poll(...args);
    };
  }
}
