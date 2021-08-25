import { PostgreSQLMigrator } from "./libs/database/postgres-migrations/Migrator";
import { TSLogger } from "./libs/logging/tslog/TSLogger";
import { Logger as TSLog } from "tslog";
import { AsyncLocalStorage } from "async_hooks";
import { PostgreSQLDatabase } from "./libs/database/pg/Database";
import { Inbox } from "./libs/resilience/inbox/Inbox";
import { InboxPollingWorker } from "./libs/resilience/inbox/PollingWorker";
import { InboxEnqueuer } from "./libs/resilience/inbox/Enqueuer";
import { InboxDequeuer } from "./libs/resilience/inbox/Dequeuer";
import { InboxEventHandler } from "./libs/resilience/inbox/EventHandler";
import { RabbitMQPublisher } from "./libs/resilience/inbox/RabbitMQPublisher";

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

    const database = new PostgreSQLDatabase(logger);

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

    const inbox = new Inbox(
      new InboxEnqueuer(txClient, logger),
      new InboxPollingWorker(
        new InboxDequeuer(txClient, logger),
        new InboxEventHandler(txClient, new RabbitMQPublisher(logger), logger),
        logger
      ),
      logger
    );

    await inbox.open();

    await txClient.exec("DELETE FROM inbox WHERE true");

    await inbox.publishEvent({
      id: "00000000-0000-0000-0000-000000000000",
      correlationId: "00000000-0000-0000-0000-000000000000",
      name: "first",
      date: "2017-03-31 9:30:20",
    });
    await inbox.publishEvent({
      id: "10000000-0000-0000-0000-000000000000",
      correlationId: "10000000-0000-0000-0000-000000000000",
      name: "second",
      date: "2017-03-31 9:30:20",
    });
    await inbox.publishEvent({
      id: "20000000-0000-0000-0000-000000000000",
      correlationId: "20000000-0000-0000-0000-000000000000",
      name: "third",
      date: "2017-03-31 9:30:20",
    });
    await inbox.publishEvent({
      id: "30000000-0000-0000-0000-000000000000",
      correlationId: "30000000-0000-0000-0000-000000000000",
      name: "fourth",
      date: "2017-03-31 9:30:20",
    });

    await txClient.commitTransaction();

    await new Promise((resolve) => setTimeout(resolve, 10000));

    await inbox.close();

    await txClient.disconnect();
  } catch (err) {
    logger.error(err);
  }
};

run();
