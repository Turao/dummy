export interface Queue {
  exists: () => Promise<boolean>;
  declare: () => Promise<void>;
  bind: (routingKey: string) => Promise<void>;
}
