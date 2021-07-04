export interface Client {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}
