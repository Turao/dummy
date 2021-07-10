import { LoggingContext } from "./Context";

export interface Logger {
  fatal: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  info: (...args: unknown[]) => void;
  debug: (...args: unknown[]) => void;

  getContext: () => LoggingContext;
  setContext: (context: LoggingContext) => void;
}
