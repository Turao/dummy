import { AppLogger } from "./logger/logger";
import { InboxPublisher } from "./resilience/inbox-outbox/inbox/publisher";
import { OutboxPublisher } from "./resilience/inbox-outbox/outbox/publisher";
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

const publish = async () => {
  await new InboxPublisher(AppLogger).publish({
    id: "inbox-id",
    name: "inbox-event",
    correlationId: "inbox-correlation-id",
    date: Date.now(),
  });

  await new OutboxPublisher(AppLogger).publish({
    id: "inbox-id",
    name: "inbox-event",
    correlationId: "inbox-correlation-id",
    date: Date.now(),
  });
};

publish();
