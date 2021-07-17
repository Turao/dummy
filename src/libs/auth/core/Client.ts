export interface Client {
  authenticate: () => Promise<void>;
}
