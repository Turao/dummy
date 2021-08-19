export interface Migrator {
  up: (path: string) => Promise<void>;
  down: (path: string) => Promise<void>;
}
