import { AppLogger, Logger } from "./logger/logger";
import { InboxConsumer } from "./resilience/inbox-outbox/inbox/consumer";
import { InboxPublisher } from "./resilience/inbox-outbox/inbox/publisher";
import { OutboxConsumer } from "./resilience/inbox-outbox/outbox/consumer";
import { OutboxPublisher } from "./resilience/inbox-outbox/outbox/publisher";
import { Pollable } from "./resilience/polling/pollable";
import { Polled } from "./resilience/polling/Polled";
import { Retriable } from "./resilience/retry/retriable";
import { Retry } from "./resilience/retry/Retry";
import { LinearTicker } from "./resilience/retry/ticker";

const consumeInbox = async () => {
  AppLogger.info("starting outbox consumer...");

  const consumer = new InboxConsumer(AppLogger);
  const pollable = new Pollable(new LinearTicker(1500));
  const retriable = new Retriable(20, new LinearTicker(1000), AppLogger);

  await retriable.of(pollable.of(consumer.consume.bind(consumer)))();
};
consumeInbox();

// const consumeOutbox = async () => {
//   AppLogger.info("starting outbox consumer...");

//   const consumer = new OutboxConsumer(AppLogger);
//   const pollable = new Pollable(new LinearTicker(1500));
//   const retriable = new Retriable(20, new LinearTicker(1000), AppLogger);

//   await retriable.of(pollable.of(consumer.consume.bind(consumer)))();
// };
// consumeOutbox();

class ReliableOutboxConsumer extends OutboxConsumer {
  @Retry({ limit: 20, logger: AppLogger, ticker: new LinearTicker(1000) })
  @Polled({ logger: AppLogger, ticker: new LinearTicker(1000) })
  async consume() {
    return super.consume();
  }
}

const startOutboxConsumer = async () =>
  await new ReliableOutboxConsumer(AppLogger).consume();

startOutboxConsumer();
