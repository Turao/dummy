import { Client, TransactionalClient } from "./Client";
import { ConnectionDetails } from "./Connection";

export interface Database {
  getClient: (connection: ConnectionDetails) => Promise<Client>;
  getTransactionalClient: (
    connection: ConnectionDetails
  ) => Promise<TransactionalClient>;
}
