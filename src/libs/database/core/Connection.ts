export interface Connection {
  ssl: boolean;
  host: string;
  port: number;
  database: string;

  user: string;
  password: string;
}
