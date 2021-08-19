import { PostgreSQLMigrator } from "./libs/database/postgres-migrations/Migrator";
import { TSLogger } from "./libs/logging/tslog/TSLogger";
import { Logger as TSLog } from "tslog";
import { AsyncLocalStorage } from "async_hooks";

const logger = new TSLogger(new TSLog(), new AsyncLocalStorage(), {
  level: "debug",
  pretty: true,
});

new PostgreSQLMigrator(
  {
    database: "postgres",
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    path: "migrations",
  },
  logger
).migrate();
