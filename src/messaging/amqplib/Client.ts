import { Logger } from "../../logging/core/Logger";
import { Client } from "../core/Client";
import amqplib from "amqplib";
export interface Config {
  protocol: "amqp" | "amqps";
  host: string;
  port: number;

  user: string;
  password: string;
}

export const defaults: Config = {
  protocol: "amqp",
  host: "localhost",
  port: 5672,
  user: "guest",
  password: "guest",
};

export const env: Config = {
  protocol: process.env.RABBITMQ_PROTOCOL as Config["protocol"],
  host: process.env.RABBITMQ_HOST as string,
  port: Number(process.env.RABBITMQ_PORT),
  user: process.env.RABBITMQ_USER as string,
  password: process.env.RABBITMQ_PASSWORD as string,
};

export class AMQPClient implements Client {
  private readonly config: Config;
  private readonly logger: Logger;

  private connection: amqplib.Connection | null = null;

  constructor(config: Config, logger: Logger) {
    this.config = config;
    this.logger = logger;
  }

  isConnected(): boolean {
    return this.connection !== null;
  }

  async connect(): Promise<void> {
    if (this.isConnected()) {
      this.logger.debug("client already connected");
      return;
    }

    const URI = `${this.config.host}:${this.config.port}`;
    this.logger.debug("connecting to:", URI);

    try {
      this.connection = await amqplib.connect({
        protocol: this.config.protocol,
        hostname: this.config.host,
        port: this.config.port,
        username: this.config.user,
        password: this.config.password,
      });
      this.logger.debug("connected to:", URI);
      process.once("SIGINT", this.disconnect.bind(this));
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async disconnect(): Promise<void> {
    const URI = `${this.config.host}:${this.config.port}`;
    this.logger.debug("disconnecting from:", URI);

    if (!this.isConnected()) {
      this.logger.debug("client not connected");
      return;
    }

    try {
      await this.connection?.close();
      this.logger.debug("disconnected from:", URI);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  getConnection(): amqplib.Connection | null {
    return this.connection;
  }
}
