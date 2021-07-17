import { Server } from "../core/Server";
import {
  Express,
  Router,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import { Logger } from "../../logging/core/Logger";
import { Handler } from "../core/Handler";

export interface Config {
  port: number;
}

export class ExpressServer implements Server {
  private readonly express: Express;
  private readonly config: Config;
  private readonly logger: Logger;

  constructor(express: Express, config: Config, logger: Logger) {
    this.express = express;
    this.config = config;
    this.logger = logger;
  }

  async serve(): Promise<void> {
    this.logger.info("serving MyServer...");
    this.express.listen(this.config, this.onListen.bind(this));
  }

  private async onListen(): Promise<void> {
    this.logger.info("listening on port", this.config.port);
  }

  async registerHandler<Request, Response>(
    path: string,
    handler: Handler<Request, Response>
  ): Promise<void> {
    this.logger.debug("registering handler", {
      path,
      handler: handler.handle.name,
    });
    this.express.get(
      path,
      async (
        request: ExpressRequest,
        response: ExpressResponse
      ): Promise<void> => {
        const req = request.body as Request;
        const res = await handler.handle(req);
        response.send(res);
      }
    );
  }
}
