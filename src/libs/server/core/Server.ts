import { Handler } from "./Handler";

export interface Server {
  serve: () => Promise<void>;

  registerHandler: <Request, Response>(
    path: string,
    handler: Handler<Request, Response>
  ) => Promise<void>;
}
