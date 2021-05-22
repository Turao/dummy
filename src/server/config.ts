export interface Config {
  port: number;
}

export const defaults: Config = {
  port: 8080,
};

export const env: Config = {
  port: Number(process.env.SERVER_PORT),
};
