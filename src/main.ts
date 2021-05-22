import { AppLogger } from "./logger/logger";
import { Retriable } from "./resilience/retry/retriable";
import { LinearTicker } from "./resilience/retry/ticker";

function test() {
  const n = Math.random();
  if (n > 0.2) {
    throw Error(`${n}`);
  } else {
    return n;
  }
}

new Retriable(20, new LinearTicker(1000), AppLogger)
  .from(test)()
  .then((n: number) => console.log({ n }))
  .catch((error: Error) => AppLogger.error(error.message));
