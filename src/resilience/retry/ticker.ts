export interface Ticker {
  tick: () => Promise<void>;
}

export class LinearTicker implements Ticker {
  private readonly period: number;

  constructor(period: number) {
    this.period = period;
  }

  async tick(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, this.period));
  }
}

export class ExponentialTicker implements Ticker {
  private readonly period: number;
  private readonly exponential: number;
  private counter: number;

  constructor(period: number, exponential: number) {
    this.period = period;
    this.exponential = exponential;
    this.counter = 0;
  }

  async tick(): Promise<void> {
    await new Promise((resolve) =>
      setTimeout(
        resolve,
        this.period * Math.pow(this.counter, this.exponential)
      )
    );
    this.counter++;
  }
}
