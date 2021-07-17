export interface Exchange {
  exists: () => Promise<boolean>;
  declare: () => Promise<void>;
}
