export interface Client {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;

  exec: (query: string, ...parameters: string[]) => Promise<void>;
  query: <Row>(query: string, ...parameters: string[]) => Promise<Row[]>;
}

export interface TransactionalClient extends Client {
  beginTransaction: () => Promise<void>;
  commitTransaction: () => Promise<void>;
  rollbackTransaction: () => Promise<void>;
}
