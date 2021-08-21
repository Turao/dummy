import { PostgreSQLMigrator } from "./libs/database/postgres-migrations/Migrator";
import { TSLogger } from "./libs/logging/tslog/TSLogger";
import { Logger as TSLog } from "tslog";
import { AsyncLocalStorage } from "async_hooks";
import { PostgreSQLTransactionalClient } from "./libs/database/pg/TransactionalClient";
import { PostgreSQLClient } from "./libs/database/pg/Client";
import { PosotgreSQLDatabase } from "./libs/database/pg/Database";

const logger = new TSLogger(new TSLog(), new AsyncLocalStorage(), {
  level: "debug",
  pretty: true,
});

const run = async () => {
  try {
    await new PostgreSQLMigrator(
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

    const database = new PosotgreSQLDatabase(logger);

    const txClient = await database.getTransactionalClient({
      ssl: false,
      host: "localhost",
      port: 5432,
      database: "postgres",
      user: "postgres",
      password: "postgres",
    });

    await txClient.connect();
    await txClient.exec("DELETE FROM delivery WHERE true");

    await txClient.beginTransaction();
    await txClient.txExec(
      "INSERT INTO delivery VALUES($1, $2)",
      "00000000-0000-0000-0000-000000000000",
      "test"
    );
    // await txClient.commitTransaction();
    // await txClient.rollbackTransaction();
    await txClient.disconnect();
  } catch (err) {
    logger.error(err);
  }
};

run();
