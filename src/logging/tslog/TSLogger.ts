import { Logger } from "../core/Logger";
import { Logger as TSLog } from "tslog";
import { AsyncLocalStorage } from "async_hooks";
import { LoggingContext } from "../core/Context";

export interface Config {
  pretty: boolean;
  level: "fatal" | "error" | "warn" | "info" | "debug";
}

export class TSLogger implements Logger {
  private readonly logger: TSLog;
  private readonly context: AsyncLocalStorage<LoggingContext>;

  constructor(
    logger: TSLog,
    context: AsyncLocalStorage<LoggingContext>,
    config: Config
  ) {
    this.logger = logger;
    this.context = context;

    this.configure(config);
  }

  setContext(context: LoggingContext): void {
    this.context.enterWith(context);
  }

  getContext(): LoggingContext {
    const ctx = this.context.getStore();
    return ctx ? ctx : {};
  }

  configure(config: Config): void {
    this.logger.setSettings({ ignoreStackLevels: 4 });
    this.logger.setSettings({
      requestId: () => JSON.stringify(this.context.getStore()),
    });

    this.logger.setSettings({ type: config.pretty ? "pretty" : "json" });
    this.logger.setSettings({ minLevel: config.level });
  }

  fatal(...args: unknown[]): void {
    this.logger.fatal(...args);
  }

  error(...args: unknown[]): void {
    this.logger.error(...args);
  }

  warn(...args: unknown[]): void {
    this.logger.warn(...args);
  }

  info(...args: unknown[]): void {
    this.logger.info(...args);
  }

  debug(...args: unknown[]): void {
    this.logger.debug(...args);
  }
}
