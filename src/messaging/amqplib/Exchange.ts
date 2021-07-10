import { Logger } from "../../logging/core/Logger";
import { Exchange } from "../core/Exchange";
import { AMQPClient } from "./Client";

export interface Config {
  name: string;
  type: "topic";
}

export class AMQPExchange implements Exchange {
  private readonly client: AMQPClient;
  private readonly config: Config;
  private readonly logger: Logger;

  constructor(client: AMQPClient, config: Config, logger: Logger) {
    this.client = client;
    this.config = config;
    this.logger = logger;
  }

  async exists(): Promise<boolean> {
    try {
      await this._exists();
      return true;
    } catch (err) {
      this.logger.info("aaaaaaaaaaaaaaaaaaaa");
      // this.logger.error(err);
      return false;
    }
  }

  private async _exists(): Promise<unknown> {
    const connection = this.client.getConnection();
    connection?.on("error", () => {
      throw Error("testing");
    });
    const channel = await connection?.createChannel();
    return channel?.checkExchange(this.config.name);
  }

  async declare(): Promise<void> {
    this.logger.debug("declaring exchange:", this.config.name);
    try {
      // const connection = this.client.getConnection();
      // const channel = await connection?.createChannel();
      // const exchange = await channel?.assertExchange(this.config.name, "topic");
      // if (exchange === undefined) {
      //   throw Error(`unable to declare exchange: ${this.config.name}`);
      // }
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
