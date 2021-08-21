import { Client, TransactionalClient } from "../core/Client";
import { Database } from "../core/Database";
import { ConnectionDetails } from "../core/Connection";
import { Logger } from "../../logging/core/Logger";
import { PostgreSQLClient } from "./Client";
import { PostgreSQLTransactionalClient } from "./TransactionalClient";

export class PostgreSQLDatabase implements Database {
  private readonly clients: Map<ConnectionDetails, Client>;
  private readonly txClients: Map<ConnectionDetails, TransactionalClient>;
  private readonly logger: Logger;

  constructor(logger: Logger) {
    this.clients = new Map();
    this.txClients = new Map();

    this.logger = logger;
  }

  async getClient(connection: ConnectionDetails): Promise<Client> {
    this.logger.debug("getting client");
    if (!this.clients.has(connection)) {
      this.clients.set(
        connection,
        new PostgreSQLTransactionalClient(
          new PostgreSQLClient(connection, this.logger),
          this.logger
        )
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.clients.get(connection)!;
  }

  async getTransactionalClient(
    connection: ConnectionDetails
  ): Promise<TransactionalClient> {
    this.logger.debug("getting transactional client");
    if (!this.txClients.has(connection)) {
      this.txClients.set(
        connection,
        new PostgreSQLTransactionalClient(
          new PostgreSQLClient(connection, this.logger),
          this.logger
        )
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.txClients.get(connection)!;
  }
}
