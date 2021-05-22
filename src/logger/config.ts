export interface Config {
  format: "json" | "human";
  level: "fatal" | "error" | "info" | "debug";
}

export const defaults: Config = {
  format: "human",
  level: "debug",
};

export const env: Config = {
  format: process.env.LOGGER_FORMAT as Config["format"],
  level: process.env.LOGGER_LEVEL as Config["level"],
};
