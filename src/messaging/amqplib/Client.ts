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
