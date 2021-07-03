export interface Client {
  connect: () => Promise<void>;
}
