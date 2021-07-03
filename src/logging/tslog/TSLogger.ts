import { Logger } from "../core/Logger";
import { Logger as TSLog } from "tslog";

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

export class TSLogger implements Logger {
  private readonly logger: TSLog;

  constructor(logger: TSLog, config: Config) {
    this.logger = logger;
    this.configure(config);
  }

  configure(config: Config): void {
    this.logger.setSettings({ ignoreStackLevels: 4 });

    this.setLogFormat(config.format);
    this.setLogLevel(config.level);
  }

  private setLogFormat(format: Config["format"]) {
    switch (format) {
      case "json":
        this.logger.setSettings({ type: "json" });
        return;

      case "human":
      default:
        this.logger.setSettings({ type: "pretty" });
    }
  }

  private setLogLevel(level: Config["level"]) {
    this.logger.setSettings({ minLevel: level });
  }

  fatal(...args: unknown[]): void {
    this.logger.fatal(...args);
  }

  error(...args: unknown[]): void {
    this.logger.error(...args);
  }

  info(...args: unknown[]): void {
    this.logger.info(...args);
  }

  debug(...args: unknown[]): void {
    this.logger.debug(...args);
  }
}
