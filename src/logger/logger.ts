import { mergeLeft } from "ramda";
import { Logger as TSLogger } from "tslog";
import { Config, defaults, env } from "./config";

export interface Logger {
  fatal: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
  info: (...args: unknown[]) => void;
  debug: (...args: unknown[]) => void;
}

class LoggerImpl implements Logger {
  private readonly logger: TSLogger;

  constructor(logger: TSLogger, config: Config) {
    this.logger = logger;
    this.configure(config);
  }

  configure(config: Config) {
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

  fatal(...args: unknown[]) {
    this.logger.fatal(...args);
  }

  error(...args: unknown[]) {
    this.logger.error(...args);
  }

  info(...args: unknown[]) {
    this.logger.info(...args);
  }

  debug(...args: unknown[]) {
    this.logger.debug(...args);
  }
}

// should this be @ main.ts ???
export const AppLogger = new LoggerImpl(
  new TSLogger(),
  mergeLeft(env, defaults)
);
