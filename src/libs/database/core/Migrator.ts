export interface Migrator {
  up: () => Promise<void>;
  down: () => Promise<void>;
}
