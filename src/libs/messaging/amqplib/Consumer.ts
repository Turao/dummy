import { Logger } from "../../logging/core/Logger";
import { Consumer } from "../core/Consumer";
import { Exchange } from "../core/Exchange";
import { Queue } from "../core/Queue";
import { AMQPClient } from "./Client";

export interface Config {
  exchange: Exchange;
  queue: Queue;
}

export class AMQPConsumer<Message> implements Consumer<Message> {
  private readonly client: AMQPClient; // todo: remove if not used
  private readonly config: Config;
  private readonly logger: Logger;

  constructor(client: AMQPClient, config: Config, logger: Logger) {
    this.client = client;
    this.config = config;
    this.logger = logger;

    this.init();
  }

  async init(): Promise<void> {
    this.logger.debug("initializing AMQPConsumer");
    this.initExchange();
    // this.initQueue();
  }

  private async initExchange(): Promise<void> {
    const { exchange } = this.config;

    this.logger.debug("initializing AMQPConsumer exchange");

    const exists = await exchange.exists();
    if (!exists) {
      await exchange.declare();
    }
  }

  private async initQueue(): Promise<void> {
    const { queue } = this.config;

    this.logger.debug("initializing AMQPConsumer queue", {
      queue,
    });

    const exists = await queue.exists();
    if (!exists) {
      await queue.declare();
    }
  }

  // todo: make abstract. onMessage should be implemented by concrete Consumers
  async onMessage(message: Message): Promise<void> {
    throw new Error("not implemented");
  }
}
